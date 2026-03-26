export {
  type AuthoringAppDependencies,
  createAuthoringAppHandler,
} from './server/express-integration';
export {
  createDataAccess,
  type DataAccess,
  type DataAccessConfig,
} from './data';
export { createServices, type Services } from './services';
