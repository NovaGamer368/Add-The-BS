const sql = require("mssql");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

const config = {
  server: "localhost",
  database: "AddTheBS2",
  user: "Add_The_BS",
  password: process.env.SQL_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(config);
exports.DAL = {
  //User CRUD
  createUser: async (email, key, username, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.connect();
      // console.log(pool);

      const query = `INSERT INTO users (userKey, email, username, img, password) VALUES ('${key}', '${email}', '${username}', '/images/profile-pictures/default-user.png', '${hashedPassword}')`;
      // console.log("Testing query: ", query);

      const request = pool.request();
      // console.log("Request going out", request);
      await request.query(query);
      // console.log("query ran: ", response);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      pool.close();
    }
  },
  getAllUsers: async () => {
    try {
      await pool.connect();

      const query = `SELECT * FROM users`;

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
  getUserById: async (userKey) => {
    try {
      await pool.connect();

      const query = ` Select * from Users where userKey = '${userKey}'`;

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
  getUserByEmail: async (email) => {
    try {
      await pool.connect();

      const query = ` Select * from users where Email = '${email}'`;

      const request = pool.request();
      const result = await request.query(query);

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
  deleteUserById: async (id) => {
    try {
      await pool.connect();

      const query = `DELETE FROM users WHERE id = '${id}';`;

      const request = pool.request();
      const result = await request.query(query);
      console.log(result);
      if (result.rowsAffected > 0) {
        return result;
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
  deleteUserByUserKey: async (userKey) => {
    try {
      await pool.connect();

      const query = `DELETE FROM users WHERE userKey = '${userKey}'`;

      const request = pool.request();
      const result = await request.query(query);
      console.log(result);
      if (result.rowsAffected > 0) {
        return result;
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error fetching user by Key:", e);
      throw e;
    } finally {
      pool.close();
    }
  },
  //Review CRUD
  createReview: async (movieId, userKey, comment, starRating) => {
    try {
      await pool.connect();
      // console.log(pool);

      const query = `INSERT INTO reviews (movieId, userKey, comment, starRating) VALUES ('${movieId}', '${userKey}', '${comment}', ${starRating})`;
      // console.log("Testing query: ", query);

      const request = pool.request();
      // console.log("Request going out", request);
      await request.query(query);
      // console.log("query ran: ", response);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      pool.close();
    }
  },

  getAllReviews: async () => {
    try {
      await pool.connect();

      const query = `SELECT * FROM reviews`;

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
  getReviewsByUserKey: async (userKey) => {
    try {
      await pool.connect();

      const query = `SELECT * FROM reviews WHERE userKey = '${userKey}'`;

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
  getReviewsByMovieId: async (movieId) => {
    try {
      await pool.connect();

      const query = `SELECT * FROM reviews WHERE movieId = '${movieId}'`;

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
  getReviewById: async (id) => {
    try {
      await pool.connect();

      const query = `SELECT * FROM reviews WHERE id = ${id}`;

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

  deleteReviewById: async (id) => {
    try {
      await pool.connect();

      const query = `DELETE FROM reviews WHERE id = '${id}';`;

      const request = pool.request();
      const result = await request.query(query);
      console.log(result);
      if (result.rowsAffected > 0) {
        return result;
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
  deleteReviewByUserKey: async (userKey) => {
    try {
      await pool.connect();

      const query = `DELETE FROM users WHERE userKey = '${userKey}'`;

      const request = pool.request();
      const result = await request.query(query);
      console.log(result);
      if (result.rowsAffected > 0) {
        return result;
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error fetching user by Key:", e);
      throw e;
    } finally {
      pool.close();
    }
  },

  generateKey: () => {
    return uuidv4();
  },
  isKeyValid: (key) => {
    return key === "ndkl-dkfd-ekrg-ewld";
  },
  comparePasswords: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },
};
