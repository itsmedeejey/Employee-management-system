import express from "express";
import employeeroute from './routes/employee.js';
import adminSignuproute from './routes/adminSignup.js';

const app = express();
app.use(express.json());
app.use(employeeroute);
app.use("/admin",adminSignuproute);

const port = 3000;
    app.listen(port, () => {
    console.log(`server is running on ${port}`);
});