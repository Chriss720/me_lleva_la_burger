import * as Sentry from "@sentry/react";

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class LoggerService {
    private formatMessage(level: LogLevel, message: string, context?: any) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] ${message} ${context ? JSON.stringify(context) : ''}`;
    }

    info(message: string, context?: any) {
        if (import.meta.env.DEV) {
            console.info(this.formatMessage('info', message, context));
        } else {
            // In prod, maybe only breadcrumbs for info
            Sentry.addBreadcrumb({
                category: 'info',
                message: message,
                data: context,
                level: 'info'
            });
        }
    }

    warn(message: string, context?: any) {
        console.warn(this.formatMessage('warn', message, context));
        Sentry.captureMessage(message, {
            level: 'warning',
            extra: context
        });
    }

    error(message: string, error?: any, context?: any) {
        console.error(this.formatMessage('error', message, context), error);
        Sentry.captureException(error || new Error(message), {
            extra: context
        });
    }

    debug(message: string, context?: any) {
        if (import.meta.env.DEV) {
            console.debug(this.formatMessage('debug', message, context));
        }
    }
}

export const Logger = new LoggerService();
