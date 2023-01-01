const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
// const bodyParser = require("body-parser");

mongoose.set("strictQuery", false);

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")
  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      err ? console.log(err) : res.send(foundArticles);
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Succesfully added a new article");
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Succesfully deleted an article");
      }
    });
  });

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
