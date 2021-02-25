import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
require('dotenv').config({ path: '.env' });

import { CredentialsRoutes } from './routes/CredentialsRoutes';

class App {
    public app: express.Application;
    public mongoUrl: string = process.env.MONGO_DB_CONNECTION;

    public credentialsRoutes: CredentialsRoutes = new CredentialsRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();

        this.credentialsRoutes.routes(this.app);
    }

    private config(): void {
        // Support application/json type post data
        this.app.use(bodyParser.json());

        //Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Preventing CORS
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

        mongoose.connection.on("error", err => {
            console.log("err", err)
        });

        mongoose.connection.on("connected", (err, res) => {
            console.log("mongoose is connected")
        });
    }
}

export default new App().app;