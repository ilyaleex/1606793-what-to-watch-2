import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createFilm, getErrorMessage} from '../utils/common.js';
import {UserServiceInterface} from '../modules/user/user-service.interface';
import {DatabaseInterface} from '../common/database-client/database.interface';
import {LoggerInterface} from '../common/logger/logger.interface';
import {FilmServiceInterface} from '../modules/film/film-service.interface';
import {FilmModel} from '../modules/film/film.entity';
import ConsoleLoggerService from '../common/logger/console-logger.service';
import FilmService from '../modules/film/fim.service';
import UserService from '../modules/user/user.service';
import {UserModel} from '../modules/user/user.entity';
import DatabaseService from '../common/database-client/database.service';
import {Film} from '../types/types.js';
import {getURI} from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '9794332';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private filmService!: FilmServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.filmService = new FilmService(this.logger, FilmModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveFilm(film: Film) {
    const user = await this.userService.findOrCreate({
      ...film.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.filmService.create({
      ...film,
      userId: user.id,
    });
  }


  private async onLine(line: string, resolve: () => void) {
    const film = createFilm(line);
    console.log(film);
    await this.saveFilm(film);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
