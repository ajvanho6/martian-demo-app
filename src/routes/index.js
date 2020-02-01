import Config from "../config"

const routes = {
  ROOT: Config.ROOT,
  APP: `${Config.ROOT}app`,
  POST: `${Config.ROOT}post/:id`
}

export default routes
