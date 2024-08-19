import express from "express"
import cors from "cors"
// import cookieParser from "cookie-parses"


const app = express ()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));



//routes declaration
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user-detail", userRoutes);

export {app}




