const express = require('express');
const movieRouter = express.Router();
const {Movie,Review} = require('../models');
//1.GEt all moVIEs
movieRouter.get('/',async (req,res)=>{
    const listOfmovies = await Movie.findAll();
    console.log("list of movies",listOfmovies);
    res.json(listOfmovies);
});

//2.Post a Moview details
movieRouter.post('/',async(req,res)=>{

        const {movieName,releaseDate}= req.body;
        const newMovie =
        await Movie.create({
            movieName : movieName,
            releaseDate : releaseDate,
        });
        console.log("movie added",newMovie);
        res.json(newMovie);

})

//3.detailsPage when click on certainMovie
movieRouter.get('/:id',async (req,res)=>{
    const movieId = req.params.id;
    try {
        //1.fetching movie details name and avgRatng
        const movie = await Movie.findByPk(
            movieId,{
                include : [{model : Review}]
            }
        );

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);

    } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = movieRouter;