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
// REQUEST TARGETING ALL ARTICLES
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

// REQUEST TARGETING SPECIFIC ARTICLE
app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No article matching was found   ");
      }
    });
  })
  .put((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      {
        title: req.body.title,
        content: req.body.content,
      },
      { overwrite: true },
      (err) => {
        if (!err) {
          console.log("Successfully Updated");
        }
      }
    );
  })
  .patch((req, res)=> {
  Article.update()
  })

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
