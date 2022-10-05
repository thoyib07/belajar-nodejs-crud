import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
// const PORT = process.env.PORT || "8080";
const PORT = "8080";
var corsOption = {
    origin: "http://localhost:"+PORT
}
app.use(cors(corsOption));
app.use(express.urlencoded({extended:true, limit:"10mb"}));
app.use(express.json({limit:"10mb"}));

app.get("/",(req, res) => {
    res.send("Selamat datang di belajar nodejs CRUD");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
