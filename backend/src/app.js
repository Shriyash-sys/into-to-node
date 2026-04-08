import express from "express";

const app = express();  // Create an express app

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes import
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// example route: http://localhost:3000/api/v1/users/create
// example route: http://localhost:3000/api/v1/posts/create


export default app;
