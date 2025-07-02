import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import config from '../config';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

container.setParameter('jwt.secret', config.JWT.SECRET);

loader.load(`${__dirname}/application.yaml`);

export default container;
