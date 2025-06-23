export const environment = {
  api: {
    construction: 'http://127.0.0.1:9009/api',
  },
  keycloak: {
    config: {
      url: 'http://localhost:8080',
      realm: 'construction-realm',
      clientId: 'connection-client'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  }
};
