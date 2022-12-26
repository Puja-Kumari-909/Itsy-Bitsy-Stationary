const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const path = require("path");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);

  process.exit(1);
});

//config path
dotenv.config({ path: path.join(__dirname, "./config/config.env") });

//connect to database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});

// Unhandled Promise Rejection like the mongo uri is wrong or something
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
