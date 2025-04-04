
function validateMovie(req,res,next){
const {movieTitle,movieDescription}=req.body;
if(!movieTitle){
    res.status(400).json({
        status:"Error",
        message:"Movie Title is required"
    })
}
if(!movieDescription){
    res.status(400).json({
        status:"Error",
        message:"Movie Description is required"
    })
}
next()
}
export default validateMovie;