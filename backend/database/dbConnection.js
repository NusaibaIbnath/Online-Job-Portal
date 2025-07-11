// import mongoose from "mongoose";

// export const dbConnection = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "MERN_JOB_SEEKING_WEBAPP",
//     })
//     .then(() => {
//       console.log("Connected to database.");
//     })
//     .catch((err) => {
//       console.log(`Some Error occured. ${err}`);
//     });
// };

import mongoose from "mongoose";

export const dbConnection = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("❌ MONGO_URI is missing from config.env");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "hospital", // optional if included in URI
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
