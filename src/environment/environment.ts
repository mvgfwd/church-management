export const environment = {
    production: false,
    version: '1.0.1',
    keycloakUrl: 'https://dev-auth.gmf-aeroasia.co.id/auth',
    baseUrl: 'http://localhost:4200',
    logger: ['error', 'log', 'warn', 'debug'],
    localKey: 'st+NsnHcipOHKvd0WCcBjqLKbo9nV8sY0',
    realm: 'sda-catalog',
    keycloakClientId: 'sda-catalog-web',
    host: {
      cm: {
        url: 'https://api-dev.gmf-aeroasia.co.id/td/sdacatalog/api',
        // url: 'http://172.16.41.107:8017/api',
        // url: 'http://localhost:8080/api',
        apiKey: '9ACF-DAF2-EA12-44EE',
        // minioUrl:'http://localhost:8080/api',
        minioUrl:'https://api-dev.gmf-aeroasia.co.id/td/sdacatalog/api',
        // minioUrl:'http://172.16.41.107:8017/api'
      },
    },
  };
  