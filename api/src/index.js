import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import { port } from "./config/index.js";

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
