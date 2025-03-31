import express from "express";
import employeeroute from './routes/employee.js';

const app = express();
app.use(express.json());
app.use(employeeroute);

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});