const routes: { method: string; path: string; func: any; }[] = [];

function addRoute(endpoint: string, service: any) {
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

addRoute('/auth/login/', require('./routes/auth/login'));
addRoute('/auth/register/:type', require('./routes/auth/register'));
addRoute('/auth/token', require('./routes/auth/token'));

// export routes as a typescript module
export default routes;