const express = require("express");
const session = require("express-session"); 
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sanitize = require('sanitize-filename');

const dal = require ("./DB_DAL").DAL;

const port = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(
    cors({
      origin: 'http://localhost:3000', 
      credentials: true, 
    })
  );
  
  
  app.use(session({
    secret: "this_is_a_very_secret_key",
    resave: false,
    saveUninitialized: true,
  }));
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/profile-pictures'); 
    },
    filename: function (req, file, cb) {
      const sanitizedFilename = sanitize(file.originalname); 
      cb(null, sanitizedFilename);
    },
  });
  
  
  const upload = multer({ storage: storage });
  
  const postImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/posts');
    },
    filename: function (req, file, cb) {
      const sanitizedFilename = sanitize(file.originalname);
      cb(null, sanitizedFilename);
    },
  });
  
  const postImageUpload = multer({ storage: postImageStorage });
  
  
  app.use(express.static('public'));

  app.put("/user/:id", upload.single('Img'), async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      if (req.file) {
        updatedUserData.Img = `./profile-pictures/${req.file.filename}`;
      }
  
      const updatedUser = await dal.updateUserProfile(userId, updatedUserData);
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post("/createUser", async (req, res) => {
    const { email, username, password } = req.body;
  
    try {
      const key = dal.generateKey(); 
      const result = await dal.createUser(email, key, username, password); 
      
      if (result) {
        res.json({ success: true, key: key });
      } else {
        res.json({ success: false, Message: "Failed to create user" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, Message: "An error occurred while creating the user" });
    }
  });
  
  
  app.post("/createKey", async (req, res) => {
    const email = req.body.email;
  
    try {
      let existingUser = await dal.getUserByEmail(email);
  
      if (existingUser) {
        res.json({ Message: "User already exists", Key: existingUser.Key });
      } else {
        const key = dal.generateKey();
        let createdUser = await dal.createUser(email, key);
  
        if (createdUser) {
          res.json({ Message: "User created successfully", Key: key });
        } else {
          res.json({ Message: "Failed to create user" });
        }
      }
    } catch (error) {
      console.error(error);
      res.json({ Message: "An error occurred while registering user" });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await dal.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
  });

  app.get("/user/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await dal.getUserById(id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await dal.getUserByEmail(email);
      if (!user) {
        return res.json({ success: false, Message: "User not found" });
      }
  
      const isValidPassword = await dal.comparePasswords(password, user.Password);
  
      if (!isValidPassword) {
        return res.json({ success: false, Message: "Invalid password" });
      }
  
      const key = dal.generateKey();
      req.session.userId = user._id; 
      res.json({ success: true, key: key, userId: user._id });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, Message: "An error occurred during login" });
    }
  });
  
  
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });