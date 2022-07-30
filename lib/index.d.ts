import * as hapi from 'hapi';
import HapiPino from 'hapi-pino';

export function app(
  routes: (server: hapi.Server, config: any) => void,
  config: any,
  defaultPort: string,
  options?: {
    loggingOptions?: HapiPino.Options;
    staticFilesDir?: string;
  }
): hapi.Server;

export function env(variable: string, defaultValue: any): any;

export function server(
  routes: (server: hapi.Server, config: any) => void,
  config: any,
  defaultPort: string,
  options?: {
    loggingOptions?: HapiPino.Options;
    staticFilesDir?: string;
  }
): hapi.Server;
