module.exports = {
  apps: [
    {
      name: "phonebook-app",
      script: "node ./app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3003,
      },
      instances: 2,
      exec_mode: "cluster",
      wait_ready: true,
      restart_delay: 1000,
    },
  ],
};
