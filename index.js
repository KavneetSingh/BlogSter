const express= require("express");
const app= express();
const port= 8080;
app.set("view engine", "ejs");
const path= require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride('_method'))



let posts= [
    {
        id: uuidv4(),
        username: "ChiefFinancier23",
        title: "What is a Recession?",
        content: "A Recession is a slowdown or a massive contraction in economic activities. A significant fall in spending generally leads to a recession. It is declared when a nation's GDP declines for two consecutive quarters. Recessions are considered to be an unavoidable part of the business cycle."
    },
    {
        id: uuidv4(),
        username: "JupitrPayer",
        title: "What is BNPL?",
        content: "BNPL (Buy now pay later) is a type of short-term financing that allows the consumer to purchase something right away and make payments for the same in future in form of instalments or lump sums. It is an unsecured loan service that provides easy credit for customers and also galvanises commerce for merchant partners."
    },
    {
        id: uuidv4(),
        username: "EcoStud",
        title: "Sri Lanka: Why is it in an economic crisis?",
        content: "Defaults happen when the government is not able to make some or all of its debt payments to the creditors. This will damage the country's reputation with investors, making it harder to borrow money from international markets, which can further harm confidence in its currency and economy."
    }
];

app.listen(port, (req,res)=>{
    console.log("Server running");
});

app.get("/", (req,res)=>{
    res.send("Server working fine.");
});

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/create", (req, res)=>{
    res.render("create.ejs");
});

app.post("/posts", (req,res)=>{
    let {username, title, content}= req.body;
    let id= uuidv4();
    console.log(req.body);
    posts.push({id,username, title, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id}= req.params;
    let post= posts.find((p)=> p.id===id);
    // console.log(post);
    res.render("view.ejs", {post});
    // res.render("view", {post});
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id}= req.params;
    let post= posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req,res)=>{
    let {id}= req.params;
    let post= posts.find((p)=> id === p.id);
    let newTitle= req.body.title;
    let newContent= req.body.content;
    // console.log(newContent);
    post.title= newTitle;
    post.content= newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts= posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});