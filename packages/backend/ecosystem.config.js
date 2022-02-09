module.exports = {
  apps: [
    {
      name: 'todos',
      script: './index.js',
      env: {
        NODE_ENV: 'production',
        DATABASE: '',
        PASSWORD: '',
        USERNAME: '',
      },
    },
  ],
};
