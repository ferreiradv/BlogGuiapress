// importação 
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const connection = require('./database/database');

const categoriasController = require('./categorias/CartegoriasController')

const articlesController = require('./articles/articlesController')

const usersController = require('./users/userController')

const Article = require('./articles/Article')

const Category = require('./categorias/Category')

const User = require('./users/userController')

//view engine

app.set('view engine', 'ejs');

//static

app.use(express.static('public'));


//Body Parser

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());


//Database

connection.authenticate().then(()=>{
    console.log('Conexão com banco de dados feita com sucesso')
}).catch((error)=>{
    console.log(error)
})


//Rotas

app.get('/',(req, res) => {
    
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit:4
    }).then(articles=>{

        Category.findAll().then(categories=>{
            res.render('index',{articles:articles, categories:categories});
        })

    })
})

app.get('/:slug',(req, res) =>{

    let slug = req.params.slug

    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render('article',{article:article, categories:categories});
            })
        }else{
            res.redirect('/article')
        }


    })

})


app.get('/category/:slug',(req,res)=>{
    let slug = req.params.slug

    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
    }).then(category =>{
        if(category != undefined){

            Category.findAll().then(categories=>{
                res.render('index',{articles:category.articles, categories:categories})
            })

        }else{
            res.redirect('/')
        }
    })
})



app.use('/',categoriasController)

app.use('/',articlesController)

app.use('/',usersController)


app.listen(8080,()=>{
    console.log('Servidor Rodando liso');
})

