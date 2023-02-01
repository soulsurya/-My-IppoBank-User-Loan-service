import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'
var app = express();

import UserLoanRouter from "./routes/user.js";
import AdminLoanRouter from "./routes/admin.js";
import { authenticateRequest } from "./auth/authentication.js";

process.on("SIGINT", () => {
    console.log(`Exiting application `);
    process.exit(0);
});

let corsDomains = process.env.CORS_ALLOWED_DOMAINS;
if (corsDomains) corsDomains = corsDomains.split(",");

app.use(cors({ origin: corsDomains, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(cookieParser());

var listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

//public router
app.get("/", (req, res) => {
    res.send("IppoPay Bank Loan API Service is up!")
    res.status(200).end()
});

//below all are private router
app.use(authenticateRequest);

app.use('/user', UserLoanRouter);
app.use('/admin', AdminLoanRouter);