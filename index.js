const startServer = require('verdaccio').default;
const store = require('verdaccio-memory').default;
const config = {
  self_path: __dirname,
  storage: './storage',
  auth: {
    htpasswd: {
      file: 'htpasswd'
    }
  },
  packages: {
    '@*/*': {
      access: '$all',
      publish: '$all'
    },
    '**': {
      access: '$all',
      publish: '$all'
    }
  },
  store: {
    memory: {
      limit: 1000
    }
  }
};

const addr = {
  port: 6001,
  path: '/',
  host: 'localhost'
};

startServer(config, 6001, store, '1.0.0', 'verdaccio', (webServer, addrs, pkgName, pkgVersion) => {
  webServer.listen(addr.port || addr.path, addr.host, () => {
    console.log('verdaccio running');
    console.dir({ addrs });
  });
});
