const mysql = require('mysql2/promise')
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const connection = mysql.createConnect({
  host: 'localhost',
  user: '',
  password: '',
  database: ''
});

exports.DAL = {

  getUserByEmail: async (email) => {
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE Gmail = ?', [email]);
    return rows[0];
  },
  updateUserProfile: async (userId, updatedUserData) => {
    try {
      const [rows, fields] = await connection.execute('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
      const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllUsers: async () => {
    try {
      const [rows, fields] = await connection.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  },
  generateKey: () => {
    return uuidv4();
  },
  createUser: async (email, key, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const [rows, fields] = await connection.execute('INSERT INTO users (Key, Gmail, Username, Img, Password) VALUES (?, ?, ?, ?, ?)', [key, email, username, '/images/profile-pictures/default-user.png', hashedPassword]);
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  isKeyValid: (key) => {
    console.log("isKeyValid" + key);
    let result = key === "ndkl-dkfd-ekrg-ewld";
    console.log("isKeyValid result");
    return result;
  },
  comparePasswords: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = sanitize(file.originalname);
    cb(null, sanitizedFilename);
  },
}