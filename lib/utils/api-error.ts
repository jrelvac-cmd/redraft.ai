export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleAPIError(error: unknown): {
  message: string;
  statusCode: number;
} {
  if (error instanceof APIError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: "Une erreur inattendue s'est produite",
    statusCode: 500,
  };
}

export function isRateLimitError(error: unknown): boolean {
  if (error instanceof APIError) {
    return error.statusCode === 429;
  }
  return false;
}

export function isAuthError(error: unknown): boolean {
  if (error instanceof APIError) {
    return error.statusCode === 401 || error.statusCode === 403;
  }
  return false;
}
