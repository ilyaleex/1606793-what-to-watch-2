export class HttpError extends Error {
  public httpStatusCode: number;

  public details: string;

  constructor(httpStatusCode: number, message: string, details: string) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.details = details;
  }
}
