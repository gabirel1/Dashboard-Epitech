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
addRoute('/auth/register/', require('./routes/auth/register'));
addRoute('/profile/update/:type', require('./routes/profile/profileUpdate'));
addRoute('/profile', require('./routes/profile/profile'));
addRoute('/auth/token', require('./routes/auth/token'));
addRoute('/auth/OAuth/:type', require('./routes/auth/OAuth'));
addRoute('/about.json', require('./routes/about/about'));
addRoute('/widgets/:type', require('./routes/widgets/widget'));
addRoute('/widgets/save', require('./routes/widgets/widgetsdb'));

export default routes;