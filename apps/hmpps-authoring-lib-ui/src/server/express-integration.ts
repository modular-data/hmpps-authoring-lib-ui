import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from 'express';
import createNextServer from 'next';
import { parse } from 'url';
import { resolve } from 'path';
import { type Services } from '@/services';
import { registerServices } from './services-registry';
import { runWithRequestContext } from './request-context';

// TODO: Fully revisit and cleanup this file after integraion PoC testing is complete.
// DO NOT refactor this file until after integration PoC testing is complete.
// This file file is quickly hacked together to make sure the integration strategy working before final clean version is implemented.

// TODO: Revisit CSP and other security-related settings.

export interface AuthoringAppDependencies {
  services: Services;
}

type NextServer = ReturnType<typeof createNextServer>;
type NextRequestHandler = ReturnType<NextServer['getRequestHandler']>;

const NEXT_BASE_PATH = '/authoring';
const NEXT_APP_DIR = resolve(__dirname, './../../');

let nextApp: NextServer | null = null;
let requestHandler: NextRequestHandler | null = null;
let preparePromise: Promise<void> | null = null;

async function ensureNextAppReady(): Promise<NextRequestHandler> {
  // Lazy initialization - ensure Next.js instance is created only once
  if (!nextApp) {
    const isDev = process.env.NODE_ENV !== 'production';

    nextApp = createNextServer({
      dev: isDev,
      dir: NEXT_APP_DIR,
      // Config is read from next.config.js automatically
      // basePath is configured there, so we don't need to pass it here
    });

    // Ensure prepare() runs exactly once
    preparePromise = nextApp
      .prepare()
      .then(() => {
        if (nextApp) {
          requestHandler = nextApp.getRequestHandler();
        }
      })
      .catch((error) => {
        console.error('Failed to prepare Next.js app:', error);
        throw error;
      });
  }

  if (preparePromise) {
    await preparePromise;
  }

  if (!requestHandler) {
    throw new Error('Next.js request handler not initialized');
  }

  return requestHandler;
}

function buildNextParsedUrl(req: Request) {
  const originalUrl = req.originalUrl ?? req.url ?? '/';
  const parsedUrl = parse(originalUrl, true);
  const pathname = parsedUrl.pathname || '/';

  return {
    ...parsedUrl,
    // Next handles the configured basePath internally, so we pass the full URL.
    pathname: pathname.startsWith(NEXT_BASE_PATH)
      ? pathname
      : `${NEXT_BASE_PATH}${pathname === '/' ? '' : pathname}`,
  };
}

export function createAuthoringAppHandler(
  dependencies: AuthoringAppDependencies,
): RequestHandler {
  const { services } = dependencies;

  registerServices(services);

  return (req: Request, res: Response, next: NextFunction): void => {
    ensureNextAppReady()
      .then((handler) => {
        const nextUrl = buildNextParsedUrl(req);
        const requestContext = {
          dprUser: res.locals.user,
        };

        // Keep the full Next request lifecycle inside the same ALS context so
        // request-scoped data remains available during async rendering and route handling.
        try {
          runWithRequestContext(requestContext, () => {
            void Promise.resolve(handler(req, res, nextUrl)).catch(next);
          });
        } catch (error) {
          next(error);
        }
      })
      .catch(next);
  };
}
