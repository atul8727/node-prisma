import "dotenv/config";
import express from "express";
import router from "./Routes/index.js";
import { errorHandler, responseHandler } from "./middleware/responseMiddleware.js";

const app = express();
app.use(express.json());
app.use(responseHandler);

app.get("/", (req, res) => {
    return res.send("hi everyone");
});

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
