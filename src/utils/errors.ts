export class AppError extends Error {
  constructor(message: string, public readonly code = 'APP_ERROR') {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class FluxerApiError extends AppError {
  constructor(message: string, public readonly status?: number) {
    super(message, 'FLUXER_API_ERROR');
    this.name = 'FluxerApiError';
  }
}

export class AudioSourceError extends AppError {
  constructor(message: string) {
    super(message, 'AUDIO_SOURCE_ERROR');
    this.name = 'AudioSourceError';
  }
}
