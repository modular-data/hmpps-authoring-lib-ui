import { AsyncLocalStorage } from 'node:async_hooks';

// TODO: Fully revisit and cleanup this file after integraion PoC testing is complete.
// DO NOT refactor this file until after integration PoC testing is complete.
// This file file is quickly hacked together to make sure the integration strategy working before final clean version is implemented.

export type RequestContext = {
  dprUser?: unknown;
};

declare global {
  var __hmppsAuthoringRequestContextStorage:
    | AsyncLocalStorage<RequestContext>
    | undefined;
}

const requestContextStorage =
  globalThis.__hmppsAuthoringRequestContextStorage ??
  new AsyncLocalStorage<RequestContext>();

if (!globalThis.__hmppsAuthoringRequestContextStorage) {
  globalThis.__hmppsAuthoringRequestContextStorage = requestContextStorage;
}

export function runWithRequestContext<T>(
  context: RequestContext,
  callback: () => T,
): T {
  return requestContextStorage.run(context, callback);
}

export function getRequestContext(): RequestContext | undefined {
  return requestContextStorage.getStore();
}

export function getDprUser<TDprUser = unknown>(): TDprUser | undefined {
  return getRequestContext()?.dprUser as TDprUser | undefined;
}
