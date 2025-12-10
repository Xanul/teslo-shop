export class ValidationError extends Error {
  constructor (
    message: string,
    public field?: string,
    public value?: unknown
  ) {
    super(message);
    this.name = "ValidationError"
  }
}

export class DatabaseError extends Error {
  constructor (
    message: string,
    public operation?: string,
    public cause?: unknown
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends Error {
  constructor (
    public resource: string,
    public identifier?: string | number
  ) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}