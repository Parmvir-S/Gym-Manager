const express = require("express");
const cors = require("cors");
const db = require("./db/db.js");
const userRouter = require("./routers/userRouter");
const ownerRouter = require("./routers/ownerRouter");
const customerRouter = require("./routers/customerRouter");


const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON to an object
app.use(userRouter);
app.use(ownerRouter);
app.use(customerRouter);

app.listen(3001, () => {
    console.log(`Listening On Port 3001`);
});