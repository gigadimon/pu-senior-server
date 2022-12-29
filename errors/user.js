class UserError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ForbiddenError extends UserError {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class ConflictError extends UserError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class ValidationError extends UserError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class UnauthorizedError extends UserError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  UserError,
  ForbiddenError,
  ConflictError,
  ValidationError,
  UnauthorizedError,
};
