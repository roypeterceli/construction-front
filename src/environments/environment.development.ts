export const environment = {
  api: {
    domain: 'http://127.0.0.1:9009',
    construction: 'http://127.0.0.1:9009/api',
  },
  keycloak: {
    config: {
      url: 'https://identity.wowperu.local',
      realm: 'wow',
      clientId: 'sgc-construction-app'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  }
};
