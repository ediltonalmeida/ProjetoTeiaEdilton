const Agent = require('agentkeepalive');

module.exports = {
    '/api/': {
        target: 'http://localhost:61000',
        secure: false,
        timeout: 6000000,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            freeSocketTimeout: 90000
        }),
        onProxyRes: proxyRes => {
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] &&
                proxyRes.headers[key].split(',');
        }
    },
    '/signalr/': {
        target: 'http://localhost:61000',
        secure: false,
        timeout: 6000000,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            freeSocketTimeout: 90000
        }),
        onProxyRes: proxyRes => {
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] &&
                proxyRes.headers[key].split(',');
        }
    },
    '/hangfire/': {
        target: 'http://localhost:61000',
        secure: false,
        timeout: 6000000,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            freeSocketTimeout: 90000
        }),
        onProxyRes: proxyRes => {
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] &&
                proxyRes.headers[key].split(',');
        }
    },
};
