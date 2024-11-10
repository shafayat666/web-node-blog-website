import express from "express";
import methodOverride from "method-override";


const app = express();
const port = 3000;
const posts = [];
const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    // console.log(posts);
    res.render("index.ejs", {
        posts: posts,
        date: formattedDate,
    });
});

app.get("/create-new", (req, res) => {
    res.render("partials/create.ejs");
});


app.post("/create", (req, res) => {
    const postTitle = req.body["title"];
    const postBody = req.body["post-body"];
    const userName = req.body["user"];
    // console.log(`Post Title: ${postTitle}`);
    // console.log(`Post Body: ${postBody}`);
    const data = {
        title: postTitle,
        content: postBody,
        user: userName,
    };

    posts.push(data);
    res.redirect("/");

});

app.put('/edit', (req, res) => {
    const index = req.body.index;
    // console.log("Editing post at index:", index);
    // console.log(posts[index]);
    // edit logic here
    res.render('partials/edit.ejs', {
        data: posts[index],
        index: index,
    });
});

app.post('/edit-new', (req, res) => {
    const index = req.body.index;
    // console.log("Editing post at index:", index);
    posts[index]["title"] = req.body["title"];
    posts[index]["content"] = req.body["post-body"];

    res.redirect('/');
});

app.delete('/delete', (req, res) => {
    const index = req.body.index;
    // console.log("Deleting post at index:", index);
    // delete logic here
    posts.splice(index, 1);
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});