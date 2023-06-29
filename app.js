const express = require('express');

const app = express();

//Template Engine

app.set("view engine", "ejs")


//MiddleWares
app.use(express.static("public"))


app.get('/', (req, res) => {
  res.status(200).render('index', {
    pageName: "index"
  });
});

app.get('/about', (req, res) => {
    res.status(200).render('about', {
        pageName: "about"
      });
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
