// import app from "./app.js";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
//   api_key: process.env.CLOUDINARY_CLIENT_API,
//   api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running at port ${process.env.PORT}`);
// });

import { config } from "dotenv";
config({ path: "./config.env" }); // ✅ Load config.env explicitly

import app from "./app.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running at port ${PORT}`);
});

// import { config } from "dotenv";
// config({ path: "./config.env" }); // Load env vars explicitly

// import app from "./app.js";

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`✅ Server running at port ${PORT}`);
// });

