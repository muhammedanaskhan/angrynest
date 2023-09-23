import mongoose from "mongoose";


const reactionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

// define the schema for our thread model

const threadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,   // means it stores ObjectId of a User
        ref: "User",    //each Thread has a reference to a User as its author
        required: true,
    },
    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    parentId:{
        type: String
    },
    reactions: {
        type: [reactionSchema],
        default: [],
    },
    children: [ // one thread can have multiple threads as its children
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ]
    
})

threadSchema.virtual("reactionsCount").get(function () {
    return this.reactions.length;
  });
  
  threadSchema.virtual("repliesCount").get(function () {
    return this.children.length;
  });

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;