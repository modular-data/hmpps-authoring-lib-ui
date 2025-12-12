import { RedisTokenStore } from '@ministryofjustice/hmpps-auth-clients'
import config from './config'
import { createRedisClient } from './data/redis.client'
import { createDataAccess } from './data'
import { createServices } from './services'
import { createApp } from './app'
import { logger } from './logger'

const tokenStore = new RedisTokenStore(createRedisClient())
const dataAccess = createDataAccess({
  coreApiConfig: config.apis.core,
  authConfig: config.apis.hmppsAuth,
  tokenStore,
  supabaseConfig: config.supabase,
})
const services = createServices(dataAccess)

const app = createApp(services)

const port = app.get('port')

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`)
})
