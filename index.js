import express from "express";
import { PrismaClient } from "@prisma/client";
import validateMovie from "./middleware/validateMovie.js";

const app = express();
app.use(express.json());
const client = new PrismaClient();

app.get("/movies", (req, res) => {
  res.send("Getting all movies");
});

app.get("/movies/:movieId", (req, res) => {
  res.send(`Getting specific movie`);
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

app.patch("/movies/:movieId", (req, res) => {
  res.send(`Updating a specific movie`);
});

app.delete("/movies/:movieId", (req, res) => {
  res.send(`Deleting a specific Movie`);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}..`);
});
