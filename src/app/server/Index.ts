import container from '../dependency-injection';
import Logger from '../../contexts/shared/domain/Logger';
import { Run } from './Run';

const logger: Logger = container.get('Shared.Logger');

try {
  new Run().start().then();
} catch (error: any) {
  logger.error(`catch ${error}`)
  process.exit(1);
}

process.on('uncaughtException', (_err) => {
  logger.error(`uncaughtException ${_err.stack}`)
  process.exit(1);
});
