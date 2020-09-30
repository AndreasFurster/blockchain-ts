export const env = {
    webPort: process.env.PORT || 3001,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'Blocks'
};

export const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/blockchain-ts';