import express from "express";
import { PrismaClient } from "@prisma/client";
import validateMovie from "./middleware/validateMovie.js";

const app = express();
app.use(express.json());
const client = new PrismaClient();

app.get("/movies", async (_req, res) => {
 try {
    const movies= await client.movieItem.findMany()
    res.status(200).json({
        status:"Success",
        message:"Successfully fetched movies",
        data:movies
    })
 } catch (e) {
   res.status(500).json({
    status:"Error",
    message:"Something went wrong. Please try again"
   }) 
 }
});

app.get("/movies/:movieId", async (req, res) => {
    const movieId=req.params;
try {
      const Movie= await client.movieItem.findFirst({
        where:{
            id:movieId
        }
      })
      if(!Movie){
        res.status(404).json({
            status:"Error",
            message:"Task not found"
        })
      }

        res.status(200).json({
            status:"Success",
            message:"Successfully fetched a movie",
            data:Movie
    
          })
      
} catch (e) {
    res.status(500).json({
        status:"Error",
        message:"something went wrong, Please try again"

    })
    
}
});

app.post("/movies", [validateMovie], async (req, res) => {
  const { movieTitle, movieDescription } = req.body;
  try {
    const newMovie = await client.movieItem.create({
      data: {
        movieTitle,
        movieDescription,
      },
    });
    res.status(201).json({
      status: "success",
      message: "New movie added successfully",
      data: newMovie,
    });
  } catch (e) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.patch("/movies/:movieId", async (req, res) => {
const {movieTitle,movieDescription,isWatched}=req.body;
try {
    const updateMovie=await client.movieItem.update({
        where:{
            id: req.params.movieId
        },
        data:{
          movieTitle:movieTitle&&movieTitle,
          movieDescription:movieDescription&&movieDescription,
          isWatched:isWatched&&isWatched
        }
    })
    res.status(200).json({
      status:"Success",
      message:"Task updated successfully",
      data:updateMovie
    })
} catch (e) {
   res.status(500).json({
    status:"Error",
    message:"Something Went Wrong"
   })  
}
});

app.delete("/movies/:movieId", (req, res) => {

});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}..`);
});
