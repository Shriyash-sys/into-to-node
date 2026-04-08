import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength:1,
        },
        description: {
            type: String,
            required: true,
            minLength: 1,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: 1,
            max: 100
        }
    }, 
    {
        timestamps: true
    }
);

export const Post = mongoose.model("Post", postSchema);
