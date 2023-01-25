//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

export const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: [true, "Please enter an email"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    autoCreate: true,
    timestaps: true,
    collection: "User",
  }
);

//before saving the user schema add
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.hashPassword(this.password).then((password) => {
    this.password = password;
    next();
  });
});

UserSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12);
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", UserSchema);

//Test Data
/* 
{"records": [
    {
      "email": "IFRC_Admin@example.com",
      "password": "password123",
      "firstName": "IFRC_ADMIN",
      "lastName": "LastName",
      "role": "Admin",
    },
    {
      "email": "testuser@example.com",
      "password": "password123",
      "firstName": "FirstName1",
      "lastName": "LastName1",
      "role": "User",
    },
    {
      "email": "testuser2@example.com",
      "password": "password123",
      "firstName": "FirstName2",
      "lastName": "LastName2",
      "role": "User",
    },
    {
      "email": "testuser3@example.com",
      "password": "password123",
      "firstName": "FirstName3",
      "lastName": "LastName3",
      "role": "User",
    },
  ],}

  */
