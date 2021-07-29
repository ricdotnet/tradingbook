export default {
  "type": "mysql",
  "host": "admin.rrocha.uk",
  "port": 3306,
  "username": "ricdotnet",
  "password": "",
  "database": process.env.DB_NAME,
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}