import 'reflect-metadata';
import { CliCommandInterface } from '../contracts';
import { FileReaderService } from '../../../services/file-reader/index.js';
import { getNormalizedData } from '../../../services/file-reader/utils/index.js';
import { DatabaseService } from '../../../services/database/index.js';
import { DatabaseInterface } from '../../../services/database/contracts/index.js';
import { ConsoleLoggerService } from '../../../services/console-logger/index.js';
import { ConfigService } from '../../../services/config/index.js';
import { ConfigInterface } from '../../../services/config/contracts/index.js';
import { getUri } from '../../../services/database/utils/index.js';
import { LoggerInterface, Film } from '../../../contracts/index.js';
import {
  UserService,
  UserServiceInterface,
  UserModel,
} from '../../../modules/user/index.js';
import {
  FilmService,
  FilmServiceInterface,
  FilmModel,
} from '../../../modules/movie/index.js';
import { PASSWORD } from '../constants/index.js';

export default class ImportCommand implements CliCommandInterface {
  readonly name = '--import';

  private readonly logger!: LoggerInterface;
  private readonly databaseService!: DatabaseInterface;
  private readonly userService!: UserServiceInterface;
  private readonly filmService!: FilmServiceInterface;
  private readonly configService!: ConfigInterface;
  private salt!: string;

  constructor() {
    this.emitReadLine = this.emitReadLine.bind(this);
    this.emitCompleteReading = this.emitCompleteReading.bind(this);

    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.databaseService = new DatabaseService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.filmService = new FilmService(this.logger, FilmModel);
  }

  async execute(filename: string) {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SALT } =
      this.configService.getFullSchema();
    const uri = getUri(DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME);
    this.salt = SALT;

    await this.databaseService.connect(uri);

    const reader = new FileReaderService(filename.trim());

    reader.on('line', this.emitReadLine);
    reader.on('end', this.emitCompleteReading);

    try {
      await reader.read();
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }
      console.log(`Error occured during reading file: ${e.message}`);
    }
  }

  private async insertData(data: Film): Promise<void> {
    const { user, ...rest } = data;
    const { id } = await this.userService.findOrCreate(
      {
        ...user,
        password: PASSWORD,
      },
      this.salt
    );

    await this.filmService.create({
      ...rest,
      userId: id,
    });
  }

  private async emitReadLine(line: string, resolve: () => void) {
    const normalizedData = getNormalizedData(line);
    await this.insertData(normalizedData);
    resolve();
  }

  private emitCompleteReading(count: number) {
    console.log(`${count} rows processed`);
  }
}
