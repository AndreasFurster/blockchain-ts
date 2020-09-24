const env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'Blocks'
}

const dbUrl = 'mongodb://localhost:27017/blockchain-ts'

module.exports = {
    env: env,
    dbUrl: dbUrl,
};