import express from "express";
import employeeroute from './routes/employee.js';
import adminSignuproute from './routes/adminSignup.js';
import adminLoginroute from './routes/adminLogin.js';
import addDeptroute from './routes/addDept.js';
import addEmproute from './routes/addEmp.js';
const app = express();
app.use(express.json());
app.use(employeeroute);
app.use("/admin",adminSignuproute);
app.use("/admin",adminLoginroute);
app.use("/admin/addDept",addDeptroute);
app.use("/admin/addEmp",addEmproute);

const port = 3000;
    app.listen(port, () => {
    console.log(`server is running on ${port}`);
});