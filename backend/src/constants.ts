import dotenv from 'dotenv'
dotenv.config()

export abstract class Constants {
    static APPLICATION_PORT = process.env.PORT || 4000;
    static DB_NAME = 'EMPLOYEE_MANGEMENT_APP';
    static DB_URI = process.env.MONGODB_URI;

}