type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

class Logger {
  private readonly prefix = '[FluxerMusicBot]';

  private format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `${timestamp} ${this.prefix} [${level}] ${message}`;
  }

  info(message: string): void {
    console.log(this.format('INFO', message));
  }

  warn(message: string): void {
    console.warn(this.format('WARN', message));
  }

  error(message: string): void {
    console.error(this.format('ERROR', message));
  }

  debug(message: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.format('DEBUG', message));
    }
  }
}

export const logger = new Logger();
