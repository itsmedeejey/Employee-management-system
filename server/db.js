import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config();

const pool = mysql.createPool({
    host:process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();
pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Database connection failed:', err);
      return;
    }
    console.log('✅ Connected to MySQL');
  
    connection.release(); // Release the connection
  });
 export async function getAllEmp() { 
  const [rows] = await pool.query(`select * from employee`);
  return rows;
} 
 export  async function putEmp(f_name,l_name,emp_no,address,salary,dept_number){
  const  [rows] = await pool.query(`insert into employee (f_name,l_name,emp_no,address,salary,dept_number)
  values(?,?,?,?,?,?)`,[f_name,l_name,emp_no,address,salary,dept_number])
  return rows;
}
// putEmp("deejey","..","900","fhasdhfh",274429,3) ;
export  async function getEmp(emp_no) { 
  const [rows] = await pool.query(`SELECT 
    e.f_name, 
    e.l_name, 
    e.emp_no, 
    d.dept_name, 
    d.dept_number, 
    GROUP_CONCAT(p.p_name SEPARATOR ', ') AS projects
FROM employee e
JOIN department d ON e.dept_number = d.dept_number
JOIN project p ON e.dept_number = p.dept_number
WHERE e.emp_no = ?
GROUP BY e.f_name, e.l_name, e.emp_no, d.dept_name, d.dept_number`,[emp_no]);

return rows;
}
