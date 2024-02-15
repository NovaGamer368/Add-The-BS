const sql = require("mssql");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

// const connection = mysql.createConnection(
//   "Server=localhost;Database=Add_The_BS;Integrated Security=True;"
// );
// // Attempt to establish the connection
// connection.connect(function (err) {
//   if (err) {
//     console.error("Error connecting to database:", err);
//     return;
//   }
//   console.log("Connected to database successfully");
// });

// // Listen for any errors during the connection process
// connection.on("error", function (err) {
//   console.error("Database error:", err);
// });

const config = {
  server: "localhost",
  database: "Add_The_BS",
  user: "Add_The_BS",
  password: process.env.SQL_PASSWORD,
  options: {
    encrypt: false, // Set to true if you're using Azure SQL Database
    trustServerCertificate: true, // Set to true if you're using Azure SQL Database
  },
};
const pool = new sql.ConnectionPool(config);

exports.DAL = {
  getUserByEmail: async (email) => {
    const query = "SELECT * FROM users WHERE Gmail = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); // Assuming only one user per email
        }
      });
    });
  },
  updateUserProfile: async (userId, updatedUserData) => {
    const { Username, Img, Password } = updatedUserData;
    const query =
      "UPDATE users SET Username = ?, Img = ?, Password = ? WHERE id = ?";
    const values = [Username, Img, Password, userId];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  getUserById: async (userId) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); // Assuming only one user per id
        }
      });
    });
  },
  getAllUsers: async () => {
    const query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  generateKey: () => {
    return uuidv4();
  },
  createUser: async (email, key, username, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.connect();
      // console.log(pool);

      const query = `INSERT INTO Users (id, Email, Username, Img, Password) VALUES ('${key}', '${email}', '${username}', '/images/profile-pictures/default-user.png', '${hashedPassword}')`;
      // console.log("Testing query: ", query);

      const request = pool.request();
      // console.log("Request going out");
      await request.query(query);
      // console.log("query ran");

      return true;
    } catch (e) {
      return false;
    } finally {
      pool.close();
    }
  },
  isKeyValid: (key) => {
    return key === "ndkl-dkfd-ekrg-ewld";
  },
  comparePasswords: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },
};
