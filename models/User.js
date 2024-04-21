import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       min: 2,
//       max: 50,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       min: 2,
//       max: 50,
//     },
//     email: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 5,
//     },
//     picturePath: {
//       type: String,
//       default: "",
//     },
//     friends: {
//       type: Array,
//       default: [],
//     },
//     gender: {
//       type: String,
//       enum:["Male", "Female"],
//       required:true,
//     },
//     dateOfBirth: {
//       type: Date,
//       required: true,
//       trim: true,
//     },
//     location: String,
//     occupation: String,
//     viewedProfile: Number,
//     impressions: Number,
//   },
//   { timestamps: true }
// );

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true,
      min: 5,
  },
  profilePicture: {
      type: String,
      default: ""
  },
  coverPicture: {
      type: String,
      default: ""
  },
  friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  gender: {
    type: String,
    enum:["male", "female"],
    required:true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
}, { timestamps: true })


const User = mongoose.model("User", UserSchema);
export default User;
