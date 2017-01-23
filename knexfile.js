module.exports = {
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: '127.0.0.1',
      user: 'datahub',
      password: 'password',
      database: 'investment-test'
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/test/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'datahub',
      password: 'password',
      database: 'investment'
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/production'
    }
  }
}
