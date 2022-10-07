"use static";

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./models/index');


const app = express();
// const PORT = process.env.PORT || "8080";
const PORT = "8080";
var corsOption = {
    origin: "http://localhost:"+PORT
}
app.use(cors(corsOption));
app.use(express.urlencoded({extended:true, limit:"10mb"}));
app.use(express.json({limit:"10mb"}));
require('./routes/tutorialRoute')(app);

if (!process.env.IS_PROD) {
    const seqOpt = (process.env.IS_PROD ? { force:true } : {});
    db.conn.sync(seqOpt)
        .then(() => {
            console.info('Drop and re-sync db.');
        })
        .catch((err) => {
            console.info(`Failed to sync DB : ${err.message}`);
        });
}

app.get("/",(req, res) => {
    res.send("Selamat datang di belajar nodejs CRUD");
});

app.get("/test",(req, res) => {
    // console.info(db.tutorial.findALL({
    //     attribute: ['title']
    // }));
    console.info(db.tutorial);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
