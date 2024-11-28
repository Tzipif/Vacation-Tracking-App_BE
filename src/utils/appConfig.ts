import path from "path";
import dotenv from "dotenv";

dotenv.config();

class AppConfig {
    readonly port: number = 4000
    readonly routePrefix = "/api/v1";
    readonly vocatinImagePrefix = path.resolve(__dirname, '..', 'assets', 'images');
    readonly doormanKey = process.env.DOORMAN_KEY
    readonly jwtSecret = process.env.JWT_TOKEN
    
    readonly dbConfig = {
        host: "localhost",
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'follow-vacations-app'
    }
}

export const appConfig = new AppConfig()