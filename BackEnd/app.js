const MovieDB_DAL = require("./MovieDB_DAL");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sanitize = require("sanitize-filename");
const sql = require("mssql");

const dal = require("./DB_DAL").DAL;
const movieDB = new MovieDB_DAL();

const port = 3306;

const app = express();

app.use(express.json());
//app.use(express.urlencoded());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/profile-pictures");
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = sanitize(file.originalname);
    cb(null, sanitizedFilename);
  },
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const upload = multer({ storage: storage });

app.use(express.static("public"));

//CREATE
app.post("/createUser", async (req, res) => {
  const { email, username, password } = req.body;
  // console.log("Received Request Body:", req.body);

  try {
    const key = await dal.generateKey();
    // console.log(email, "  |  ", key, "  |  ", email, "  |  ", password);
    // await sql.query`INSERT INTO Users (id, Email, Username, Img, Password) VALUES ('${key}', '${email}', '${username}', '/images/profile-pictures/default-user.png', '${hashedPassword}')`;
    const result = await dal.createUser(email, key, email, password);
    // console.log("Create User Result:", result);

    if (result) {
      res.json({ success: true, key: key });
    } else {
      res.json({ success: false, Message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      Message: "An error occurred while creating the user",
    });
  }
});
//READ
// GETS ALL USERS
app.get("/users", async (req, res) => {
  try {
    const users = await dal.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});
//GETS USER BY UserKey
app.get("/user/key/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let user = await dal.getUserByUserKey(key);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//GETS USER BY id
app.get("/user/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await dal.getUserById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//UPDATE
app.put("/user/:id", upload.single("Img"), async (req, res) => {
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
    res.status(500).json({ error: "Internal server error" });
  }
});

//DELETE
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("deleting user: ", userId);

    await dal.deleteUserById(userId);
    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//ADMIN STUFF???
app.post("/createKey", async (req, res) => {
  // const email = req.body.email;
  // try {
  //   let existingUser = await dal.getUserByEmail(email);
  //   if (existingUser) {
  //     res.json({ Message: "User already exists", Key: existingUser.Key });
  //   } else {
  //     const key = dal.generateKey();
  //     let createdUser = await dal.createUser(email, key);
  //     if (createdUser) {
  //       res.json({ Message: "User created successfully", Key: key });
  //     } else {
  //       res.json({ Message: "Failed to create user" });
  //     }
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.json({ Message: "An error occurred while registering user" });
  // }
});
//LOGIN STUFF
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await dal.getUserByEmail(email);
    if (!user) {
      return res.json({ success: false, Message: "User not found" });
    }

    console.log("The user ", user.password);
    const isValidPassword = await dal.comparePasswords(password, user.password);

    if (!isValidPassword) {
      return res.json({ success: false, Message: "Invalid password" });
    }

    res.json({ success: true, key: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, Message: "An error occurred during login" });
  }
});

// MOVIE DB THINGS
movieDB.authenticate();

app.get("/MovieDB/getMovies/:pageNum", async (req, res) => {
  try {
    let pageNum = req.params.pageNum;
    let movies = await movieDB.getMovies(pageNum);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});

app.get("/MovieDB/getSimpleMovies/:pageNum", async (req, res) => {
  try {
    let pageNum = req.params.pageNum;
    let movies = await movieDB.getSimpleMovies(pageNum);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/getGenreList", async (req, res) => {
  try {
    let movies = await movieDB.getMovieGenre();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/Movies/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let movies = await movieDB.getMoviesByGenre(genre);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/Actor/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let movies = await movieDB.getActorById(id);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/ActorName/:name", async (req, res) => {
  try {
    let name = req.params.name;
    // console.log("name is: ", name);
    let movies = await movieDB.getActorByName(name);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/trending", async (req, res) => {
  try {
    let movies = await movieDB.getTrendingMovies();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/MovieName/:name", async (req, res) => {
  try {
    let name = req.params.name;
    // console.log("name is: ", name);
    let movies = await movieDB.getMovieByName(name);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/MovieId/:id", async (req, res) => {
  try {
    let id = req.params.id;
    // console.log("id is: ", id);
    let movies = await movieDB.getMovieById(id);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/Movie/Recommend/:movieId", async (req, res) => {
  try {
    let movieId = req.params.movieId;
    // console.log("movieId is: ", movieId);
    let movies = await movieDB.getMovieRecommendations(movieId);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/Movie/Similar/:movieId", async (req, res) => {
  try {
    let movieId = req.params.movieId;
    // console.log("movieId is: ", movieId);
    let movies = await movieDB.getSimilarMovie(movieId);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});
app.get("/MovieDB/Poster/:poster", async (req, res) => {
  try {
    let poster = req.params.poster;
    // console.log("poster is: ", poster);
    let movies = await movieDB.getMoviePoster(poster);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DataBase Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
