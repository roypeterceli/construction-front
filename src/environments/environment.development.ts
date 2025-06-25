export const environment = {
  api: {
    construction: 'http://127.0.0.1:9009/api',
  },
  keycloak: {
    config: {
      url: 'http://localhost:8080',
      realm: 'construction-realm',
      clientId: 'connection-client',
      clientSecret: '9NKUBK4f16GUi38pZJ8KUyC5DG2PJjoW',
      grant_type: 'password',
      username: 'admin',
      password: 'admin',
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
    loadUserProfileAtStartUp: true
  }
};
