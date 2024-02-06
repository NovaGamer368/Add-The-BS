const { ApolloServer, gql } = require('apollo-server');
const { GraphQLUpload } = require('graphql-upload');
const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const { createWriteStream } = require('fs');

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
  scalar Upload

  type User {
    id: ID!
    Key: String!
    Gmail: String!
    Username: String!
    Img: String!
    Password: String!
    isKeyValid: Boolean
    comparePasswords(inputPassword: String!): Boolean
    filename: String
  }

  type Query {
    getUserByEmail(email: String!): User
    getUserById(userId: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(email: String!, key: String!, username: String!, password: String!): User
    updateUserProfile(userId: ID!, updatedUserData: UserInput!): User
    uploadProfilePicture(userId: ID!, file: Upload!): String
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
    uploadProfilePicture: async (_, { userId, file }) => {
      const { createReadStream, filename } = await file;
      const writableStream = createWriteStream(`./public/images/profile-pictures/${filename}`);
      await new Promise((resolve, reject) => {
        createReadStream()
          .pipe(writableStream)
          .on('finish', resolve)
          .on('error', reject);
      });
      return filename;
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
    filename: (parent, args, context, info) => {
      // Return the filename from the Img field
      return parent.Img;
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