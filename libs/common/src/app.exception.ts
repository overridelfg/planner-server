export enum AppError {
  JWT = 100,
}

export class AppException<T> extends Error {
  constructor(
    public readonly code: T,
    public readonly message: string,
    public readonly meta?: Record<string, unknown>,
  ) {
    super(message);
  }
}
