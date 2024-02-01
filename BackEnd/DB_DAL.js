const { ApolloServer, gql } = require('apollo-server');
const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const connectionString = "mongodb+srv://johnstonharlea:I62V4Lsg3tjSkxzC@cluster0.ryaxisq.mongodb.net/User";
const collectionOne = "users"

mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongoose Connected")
});

const userSchema = new Schema(
    {
      Key: String,
      Gmail: String,
      Username: String,
      Img:String,
      Password: String,
    },
    { collection: collectionOne }
);

const UserModel = mongoose.model("User", userSchema);

const typeDefs = gql`
  type User {
    id: ID!
    Key: String!
    Gmail: String!
    Username: String!
    Img: String!
    Password: String!
  }

  type Query {
    getUserByEmail(email: String!): User
    getUserById(userId: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(email: String!, key: String!, username: String!, password: String!): User
    updateUserProfile(userId: ID!, updatedUserData: UserInput!): User
  }

  input UserInput {
    Key: String
    Gmail: String
    Username: String
    Img: String
    Password: String
  }
`;

const resolvers = {
  Query: {
    getUserByEmail: async (_, { email }) => await UserModel.findOne({ Gmail: email }),
    getUserById: async (_, { userId }) => await UserModel.findById(userId),
    getAllUsers: async () => await UserModel.find(),
  },
  Mutation: {
    createUser: async (_, { email, key, username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        Key: key,
        Gmail: email,
        Username: username,
        Img: "/images/profile-pictures/default-user.png", 
        Password: hashedPassword,
      });
      return newUser;
    },
    updateUserProfile: async (_, { userId, updatedUserData }) => {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedUserData },
        { new: true }
      );
      return updatedUser;
    },
  },
  User: {
    isKeyValid: (parent, args, context, info) => {
      console.log("isKeyValid" + parent.Key);
      let result = parent.Key === "ndkl-dkfd-ekrg-ewld";
      console.log("isKeyValid result");
      return result;
    },
    comparePasswords: async (parent, { inputPassword }) => {
      return await bcrypt.compare(inputPassword, parent.Password);
    },
    filename: (parent, { file }, context, info) => {
      const sanitizedFilename = sanitize(file.originalname);
      return sanitizedFilename;
    },
    generateKey: () => {
      return uuidv4();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});