import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../utils/custom-error";

export default function handleError(
  err: TypeError | ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof ResponseError)) {
    customError = new ResponseError("Error !");
  }

  res.status((customError as ResponseError).statusCode).json({
    message: (customError as ResponseError).message,
    status: (customError as ResponseError).status,
    validation: (customError as ResponseError).validation
  });
}
