export const environment = {
  api: {
    domain: 'http://127.0.0.1:9009',
    construction: 'http://127.0.0.1:9009/api',
  },
  keycloak: {
    config: {
      url: 'http://localhost:8080',
      realm: 'my-realm',
      clientId: 'angular-client'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  }
};