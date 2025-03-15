// const exp = require("constants");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// const bodyParser= require("body-parser");
// app.use(bodyParser.json());
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "saloni singh",
        content : "I am in love with coding"
    },
    {
        id : uuidv4(),
        username : "monika",
        content : "my exam didn't go well"
    },
    {
        id : uuidv4(),
        username : "thv",
        content : "A masterpices in this world!"
    }
];

app.get("/posts",(req,res) =>{
    res.render("index",{posts});
});
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    let{ username,content} = req.body;
    let id = uuidv4();
    
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => String(p.id) === id); // Convert p.id to string
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
});

// app.patch("/posts/:id", (req, res) => {
//     console.log("Full Request Body:",JSON.stringify(req.body,null,2)); // Log the full request body
//     console.log("req.body.content Type", typeof req.body.content);
//     let { id } = req.params;
//     id = String(id).trim();
//     let newContent = req.body.content; // This should contain the updated content
//     console.log("Extracted Content:", newContent);
//     let post = posts.find((p) => String(p.id) === id);
//     console.log("found post Before update:",post);
//     if (!post) {
//         return res.status(404).send("Post not found");
//     }
//     console.log(req.is("application/json"));
//     post.content = newContent;
//     console.log("Updated Post:", post);
//     res.send("Patch request is working");
// });

app.patch("/posts/:id", (req, res) => {
    console.log("Full Request Body:", req.body);
    console.log("Type of req.body:", typeof req.body);
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("Request body is empty. Check middleware or request format.");
    }

    console.log("req.body.content Type:", typeof req.body.content);

    let id = req.params.id.trim();
    let newContent = req.body.content;  

    console.log("Extracted Content:", newContent);

    let post = posts.find((p) => String(p.id) === id);
    console.log("found post Before update:", post);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = newContent;
    console.log("Updated Post:", post);

    res.send("Patch request is working");
});
app.get("posts/:id/edit",(req,res) => {
    console.log("edit route id accessed!");
    let {id} = req.params;
    let post=posts.find((p)=> String(p.id) === id);
    res.render("edit.ejs");
    console.log("post found:", post);
});
app.listen(port,()=>{
    console.log("listening to port : 3000");
});

