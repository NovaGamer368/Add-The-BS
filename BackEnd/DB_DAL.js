const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const connectionString = "mongodb+srv://quillianrenae:8YDtlJxCKoZrlfgo@cluster0.sv3zblq.mongodb.net/";
const collectionOne = "Users"

const user = new Schema(
    {
      Key: String,
      Gmail: String,
      Username: String,
      Img:String,
      Password: String,
    },
    { collection: collectionOne }
  );
  
  const UserModel = mongoose.model("user", user);

exports.DAL = {

    getUserByEmail: async (email) => {
        return await UserModel.findOne({ Gmail: email }).exec();
      },
      updateUserProfile: async (userId, updatedUserData) => {
        try {
          const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updatedUserData },
            { new: true }
          ).exec();
          return updatedUser;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      getUserById: async (userId) => {
        try {
          const user = await UserModel.findById(userId).exec();
          return user;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      getAllUsers: async () => {
        try {
          const users = await UserModel.find(); 
          return users;
        } catch (error) {
          throw error;
        }
      },
      generateKey: () => {
        return uuidv4();
      },

      createUser: async (email, key, username, password) => {
        let newUser = {
          Key: key,
          Gmail: email,
          Username: username,
          Img: "/images/profile-pictures/default-user.png", 
          Password: await bcrypt.hash(password, 10),
        };
        try {
          const result = await UserModel.create(newUser); 
          return result; 
        } catch (error) {
          console.log("Error creating user:", error);
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
}