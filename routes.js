const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('login', '/login')
routes.add('blog-item', '/blog/:slug')