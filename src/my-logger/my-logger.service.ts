import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

  private async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('fr-MA', {
      dateStyle: 'short',
      timeStyle: 'medium',
      timeZone: 'Africa/Casablanca',
    }).format(new Date())}\t${entry}\n`;

    try {
      const logsDir = path.join(__dirname, '..', '..', 'logs');

      if (!fs.existsSync(logsDir)) {
        await fsPromises.mkdir(logsDir, { recursive: true });
      }

      await fsPromises.appendFile(
        path.join(logsDir, 'app.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context ?? 'Application'}\t${message}`;

    this.logToFile(entry);

    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext ?? 'Application'}\t${message}`;

    this.logToFile(`ERROR\t${entry}`);

    super.error(message, stackOrContext);
  }

  warn(message: any, context?: string) {
    const entry = `${context ?? 'Application'}\t${message}`;

    this.logToFile(`WARN\t${entry}`);

    super.warn(message, context);
  }

  debug(message: any, context?: string) {
    const entry = `${context ?? 'Application'}\t${message}`;

    this.logToFile(`DEBUG\t${entry}`);

    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    const entry = `${context ?? 'Application'}\t${message}`;

    this.logToFile(`VERBOSE\t${entry}`);

    super.verbose(message, context);
  }
}