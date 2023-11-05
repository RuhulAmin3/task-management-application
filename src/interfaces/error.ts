interface IGenericErrorMessage {
  path: string;
  message: string;
}

interface IGenericErrorResponse {
  statusCode: number;
  name: string;
  errorMessages: IGenericErrorMessage[];
}
