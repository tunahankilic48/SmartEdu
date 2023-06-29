const express = require('express');

const pageRoute = require("./routes/pageRoute")

const app = express();

//Template Engine

app.set("view engine", "ejs")


//MiddleWares
app.use(express.static("public"))

//Routes
app.use('/', pageRoute);

app.get('/about', );

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
