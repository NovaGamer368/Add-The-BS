const sql = require("mssql");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

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
    try {
      await pool.connect();

      const query = ` Select * from Users where Email = '${email}'`;

      const request = pool.request();
      const result = await request.query(query);
      console.log(result);
      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error fetching user by ID:", e);
      throw e;
    } finally {
      pool.close();
    }
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
    try {
      await pool.connect();

      const query = ` Select * from Users where id = '${userId}'`;

      const request = pool.request();
      const result = await request.query(query);
      console.log(result);
      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error fetching user by ID:", error);
      throw error;
    } finally {
      pool.close();
    }
  },
  getAllUsers: async () => {
    try {
      await pool.connect();

      const query = `SELECT * FROM Users`;

      const result = await pool.query(query);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    } finally {
      // Close the connection pool
      pool.close();
    }
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
