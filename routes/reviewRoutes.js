const express = require('express');
const reviewRouter = express.Router();
const {Movie,Review} = require('../models');


//1. Route for Posting a Review
reviewRouter.post('/',async(req,res)=>{
const {movieName, reviewerName, rating, reviewComments } = req.body;

try {
    //1.Finding the movieId by its name from list
    const movie = await Movie.findOne({
        where: {
            movieName : movieName
        }
    })
    //Creating review after extracting movieId from movie
    const review = await Review.create({
        MovieId: movie.id,
        reviewerName,
        rating,
        reviewComments
    });

    // Recalculate average rating for the movie
    const averageRating = await calculateAverageRating(movie.id);
    
    // Update average rating in Movie model
    await movie.update({ avgRating: averageRating });

    res.status(201).json({ message: "Review submitted successfully", review })
} catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
})



// Function to calculate average rating for a movie
async function calculateAverageRating(movieId) {
    const result = await Review.aggregate('rating', 'avg',
     { where: {
         movieId
         }
     });
    return result || null;
}


 
module.exports = reviewRouter;