export class ResponseError {
  message!: string;
  status: boolean;
  statusCode!: number;
  validation!: any;

  constructor(
    message: string,
    status: boolean = false,
    statusCode: number = 500,
    validation: any = ''
  ) {
    this.message = message;
    this.status = status;
    this.statusCode = statusCode;
    this.validation = validation;
  }
}
