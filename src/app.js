const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");

/*public static path*/
const staticPath = path.join(__dirname , '../public');
const template_path = path.join(__dirname , "../templates/views");
const partial_path = path.join(__dirname ,"../templates/partials");

/* Template Engine and partials setting using Express.js*/
app.use(express.static(staticPath));
app.set('view engine' , "hbs");
app.set('views', template_path)
hbs.registerPartials(partial_path);


app.get("/" , (req,res)=>{
    res.render("index");
});

app.get("/about" , (req,res)=>{
    res.render("about");
});

app.get("/weather" , (req,res)=>{
    res.render("weather");
});

// 404 error handler - this should be the last route
app.get("*", (req, res) => {
    res.render("404error",{
        errormsg: "Oops page couldn't found",
    });
});

app.listen(port , ()=>{
    console.log(`listening to the port at http://localhost:${port}`);    
});