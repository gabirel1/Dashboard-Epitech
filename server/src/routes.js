const routes = [];

function addRoute(endpoint, service) {
    if (service.get)
        routes.push({method: 'GET', path: endpoint, func: service.get});
    if (service.post)
        routes.push({method: 'POST', path: endpoint, func: service.post});
    if (service.put)
        routes.push({method: 'PUT', path: endpoint, func: service.put});
    if (service.patch)
        routes.push({method: 'PATCH', path: endpoint, func: service.patch});
    if (service.delete)
        routes.push({method: 'DELETE', path: endpoint, func: service.delete});
    routes.push({method: 'OPTIONS', path: endpoint, func: () => {}});
}

addRoute('/login', require('./routes/auth/login'));

module.exports = routes;