const jsonToken = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        console.log('ok')
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decodedToken = jsonToken.verify(token,'secret');
        console.log(decodedToken)
        const userId = decodedToken.userId
        console.log(userId)
        console.log(req.body.userId)
        if(req.body.userId && req.body.userId !== userId){
            throw 'pas bon ID'
        }
        else{
            next();
        }
    } catch{
        res.status(401).json({
            error: new Error('request pas valid')
        })
    }
}