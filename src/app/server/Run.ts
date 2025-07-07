import { Server } from './Server';
import config from '../config';
import container from '../dependency-injection';
import Logger from '../../contexts/shared/domain/Logger';

export class Run {
  server?: Server;
  private logger: Logger = container.get('Shared.Logger');

  async start() {
    const port = Number(config.PORT);
    this.logger.info(`Starting server on port: ${port} (from env PORT: ${process.env.PORT})`);
    this.server = new Server(port);

    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}
