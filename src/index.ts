import 'dotenv/config';

import { App } from './app';

async function main(): Promise<void> {
  const app = new App();
  await app.start();
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('[FATAL] Failed to initialize Fluxer music bot:', message);
  process.exit(1);
});
