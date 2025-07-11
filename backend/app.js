import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
export default app;



// import express from "express";
// import multer from "multer";
// import path from "path";

// const app = express();

// // Middleware to parse JSON and URL encoded form data (if needed)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 1. Multer storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "CVs"); // folder inside backend project root
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // keep original extension
//   },
// });

// const upload = multer({ storage });

// // 2. Serve CVs folder statically so frontend can access resumes by URL
// app.use("/CVs", express.static(path.join(process.cwd(), "CVs")));

// // 3. Your application post route with multer middleware
// app.post("/api/v1/application/post", upload.single("resume"), (req, res) => {
//   try {
//     const { name, email, phone, address, coverLetter, jobId } = req.body;
//     const resumeFile = req.file;

//     if (!resumeFile) {
//       return res.status(400).json({ message: "Resume file is required" });
//     }

//     // Here you can save application info to database, including resumeFile.path

//     return res.status(200).json({ message: "Application submitted successfully!" });
//   } catch (error) {
//     console.error("Error in application post:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// export default app;
