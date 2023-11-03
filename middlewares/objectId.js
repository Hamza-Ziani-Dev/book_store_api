const objectId = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 5000 : res.statusCode;
    res.status(statusCode).json({message:err.message});
 }


 module.exports = objectId;