module.exports = {
  apps: [
    {
      name: 'splog',
      script: 'run.js',
      watch: true,
      autorestart: false,
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '0,30 * * * *',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
