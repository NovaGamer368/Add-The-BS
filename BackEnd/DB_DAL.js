const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "Add_The_BS",
  }
  //"Server=(local);Database=Add-The-BS;Trusted_Connection=True;TrustServerCertificate=True"
  // {
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "Add-The-BS",
  // }
);

// const user = new Schema(
//   {
//     Key: String,
//     Gmail: String,
//     Username: String,
//     Img: String,
//     Password: String,
//   },
//   { collection: collectionOne }
// );

// Attempt to establish the connection
connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database successfully");
});

// Listen for any errors during the connection process
connection.on("error", function (err) {
  console.error("Database error:", err);
});

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (Key, Gmail, Username, Img, Password) VALUES (?, ?, ?, ?, ?)";
    const values = [
      key,
      email,
      username,
      "/images/profile-pictures/default-user.png",
      hashedPassword,
    ];
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
  isKeyValid: (key) => {
    return key === "ndkl-dkfd-ekrg-ewld";
  },
  comparePasswords: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },
};
