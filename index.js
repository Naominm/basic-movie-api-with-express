import express from 'express';

const app= express();

app.get("/movies",(req,res)=>{
res.send("Getting all movies")
})

app.get("/movies/:movieId",(req,res)=>{
res.send(`Getting specific movie`)
})

app.post("/movies",(req,res)=>{
    res.send(`creating a movie`)
})

let port=process.env.PORT ||3000;
app.listen(port,()=>{
console.log(`server running on port ${port}..`)
})