const express = require('express')

const router = express.Router()

const User = require('./User')

const bcrypt = require('bcryptjs')



router.get('/admin/users',(req,res)=>{
    
    User.findAll().then(users=>{
        res.render('admin/users/index',{users:users})
    })
})

router.get('/admin/users/create',(req,res)=>{
    res.render('admin/users/create')
})

router.post('/users/create',(req,res)=>{
    let email = req.body.email
    let password = req.body.password


    User.findOne({where:{
        email:email
    }}).then(user=>{

        if(user == undefined){

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)


    User.create({
        email: email,
        password: hash
    }).then(()=>{
        res.redirect('/admin/users')
    }).catch((err)=>{
        res.redirect('/admin/users')
    })

        }else{
            res.redirect('/admin/users/create')
        }


    })


})

router.post('/users/delete',(req,res)=>{
    let id = req.body.id

    if(id != undefined){
        //si for um numero
        if(!isNaN(id)){
            User.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/users')
            })
        }else{
            res.redirect('/admin/users')
        }
    }else{
        res.redirect('/admin/users')
    }
})

module.exports = router