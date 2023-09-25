import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reactionSchema = new mongoose.Schema({
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

// define the schema for our user model

const userSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    followers: {
      type: [followerSchema],
      default: [],
    },
    following: {
      type: [followerSchema],
      default: [],
    },
    threads: [  // one user can have multiple references to specific threads stored in the database
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    reactions:{
        type: [reactionSchema],
        default: [],
    },
    onboarded: {
        type: Boolean,
        default: false
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ]
})


userSchema.virtual("threadsCount").get(function () {
    return this.threads.length;
  });
  
  userSchema.virtual("followersCount").get(function () {
    return this.followers.length;
  });
  
  userSchema.virtual("followingCount").get(function () {
    return this.following.length;
  });
  
  userSchema.virtual("communitiesCount").get(function () {
    return this.communities.length;
  });
  
  userSchema.virtual("reactionsCount").get(function () {
    return this.reactions.length;
  });
  
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;