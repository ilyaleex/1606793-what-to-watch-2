const getUri = (
  username: string,
  password: string,
  host: string,
  port: number,
  databaseName: string
) =>
  `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;

export default getUri;
