const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const app = express()
app.use(express.json());

mongoose.connect("mongodb+srv://pramodtoleti:pramodtoleti47db@clusteruser.gii4u20.mongodb.net/?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error: " + err));

app.use('/users', router);

app.listen(9000, () => {
    console.log("Server is running at http://localhost:9000/");
})