const config = {
  development: {
    API_URL: 'http://localhost:8080',
  },
  production: {
    API_URL: 'https://hcaptcha.herokuapp.com',
  },
};

const env = process.env.NODE_ENV || 'development';
export default config[env];
