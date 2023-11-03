const notFound = (res,req,next)=>{
    const err =  new Error(`Not Found  - ${req.originalUrl}`);
    res.status(404);
    next(err)
}

module.exports = notFound;