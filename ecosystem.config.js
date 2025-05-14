module.exports = {
  apps: [
    {
      name: 'dl-lib',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        instances: 'max',
        exec_mode: 'cluster',
        watch: false,
        max_memory_restart: '1G',
        error_file: 'logs/err.log',
        out_file: 'logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        merge_logs: true,
        autorestart: true,
        max_restarts: 10,
        restart_delay: 4000,
        exp_backoff_restart_delay: 100
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        instances: 1,
        exec_mode: 'fork',
        watch: true,
        ignore_watch: ['node_modules', 'logs', '.next'],
        max_memory_restart: '1G',
        error_file: 'logs/err.log',
        out_file: 'logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        merge_logs: true,
        autorestart: true,
        max_restarts: 10,
        restart_delay: 4000,
        exp_backoff_restart_delay: 100
      }
    }
  ]
};
