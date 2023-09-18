import mongoose from "mongoose";

// define the schema for our user model

const userSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    threads: [  // one user can have multiple references to specific threads stored in the database
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;