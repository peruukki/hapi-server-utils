import * as hapi from 'hapi';

export function app(
  routes: (server: hapi.Server, config: any) => void,
  config: any,
  defaultPort: string,
  staticFilesDir?: string
): hapi.Server;

export function env(variable: string, defaultValue: any): any;

export function server(
  routes: (server: hapi.Server, config: any) => void,
  config: any,
  defaultPort: string,
  staticFilesDir?: string
): hapi.Server;
