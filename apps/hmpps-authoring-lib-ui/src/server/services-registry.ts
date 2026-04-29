import { type Services } from '@/services';

// TODO: Fully revisit and cleanup this file after integraion PoC testing is complete.
// DO NOT refactor this file until after integration PoC testing is complete.
// This file file is quickly hacked together to make sure the integration strategy working before final clean version is implemented.

declare global {
  var __hmppsAuthoringServices: Services | undefined;
}

export function registerServices(services: Services): void {
  const existingServices = globalThis.__hmppsAuthoringServices;

  if (existingServices && existingServices !== services) {
    throw new Error(
      'Services registry is already initialized with a different instance',
    );
  }

  globalThis.__hmppsAuthoringServices = services;
}

export function hasRegisteredServices(): boolean {
  return Boolean(globalThis.__hmppsAuthoringServices);
}

export function getServices(): Services {
  const services = globalThis.__hmppsAuthoringServices;

  if (!services) {
    throw new Error(
      'Services registry is not initialized. Call registerServices() in Express integration during app bootstrap.',
    );
  }

  return services;
}
