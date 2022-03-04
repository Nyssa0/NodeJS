const Controller = require('../model/model')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const jsontoken = require('jsonwebtoken')

exports.createPost = (req,res,next)=>{
    console.log("post test")
    const postObject = req.body
    delete postObject._id;
    const p = new Controller({
        title : req.body.title,
        text : req.body.text,
        author : req.body.author
    })
    p.save()
        .then(() => res.status(201).json({message : 'ok'}))
        .catch(error => res.status(400).json({error}))
}

exports.getPostId = (req,res,next)=>{
    console.log('get test id')
    Controller.findOne({_id:req.params.id})
        .then(post=> res.status(200).json(post))
        .catch(error => res.status(404).json({error}))

}

exports.getAllPost = (req,res,next)=> {
    console.log('get all test')
    Controller.find()
        .then(posts => res.status(200).json(posts))
        .catch(error=> res.status(400).json({error}));
}

exports.deletePostId = (req,res,next)=>{
    console.log('delete test id')
    Controller.deleteOne({_id:req.params.id})
        .then(post=> res.status(200).json(post))
        .catch(error => res.status(404).json({error}))
}

exports.deleteAllPost = (req,res,next)=> {
    console.log('delete all test')
    Controller.deleteMany()
        .then(posts => res.status(200).json(posts))
        .catch(error=> res.status(400).json({error}));
}

exports.updatePostId = (req,res,next)=>{
    console.log('update test id')
    Controller.updateOne({_id:req.params.id},{
        title:req.body.title,
        text: req.body.text,
        author: req.body.author

    })
        .then(post=> res.status(200).json(post))
        .catch(error => res.status(404).json({error}))
}

exports.signup = (req,res,next)=> {
    console.log("begin sign")
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log("1")
            const user = new User({
                email:req.body.email,
                password:hash
            })
            user.save()
                .then(()=> res.status(201).json({message: 'create user'}))
                .catch(()=> res.status(400).json({message: 'user not created'}))
/*
                .catch(error=> res.status(400).json({error}));
*/
        } )
        .catch(()=> res.status(500).json({message: 'nope'}))
}

exports.login = (req,res,next)=> {
    User.findOne({email:req.body.email})
        .then(user => {
            if (!user){
                return res.status(401).json({error:'pas trouvé'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(ok=>{
                    if (!ok){
                        return res.status(401).json({error:'mdp incorrect'})
                    }
                    res.status(200).json({
                        userId : user._id,
                        token : jsontoken.sign(
                            {userId: user._id}, 'secret', { expiresIn: '48h'}
                        )
                    })
                })
                .catch(error=> res.status(500).json({error}))

        })
}