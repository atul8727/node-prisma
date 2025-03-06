import "dotenv/config";
import express from "express";
import router from "./Routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("hi everyone");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
