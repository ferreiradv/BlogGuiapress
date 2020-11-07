const Sequelize = require('sequelize');

const connection = require('../database/database');

const Category = require('../categorias/Category');


const article = connection.define('article',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

})

//relacionamento um para um (belongsTo)
article.belongsTo(Category); // um artigo pertence a uma categoria

//relacionamento um para muitos (hasMany)
Category.hasMany(article); // um categoria tem muitos artigos


//ira criar a tabela
//article.sync({force: true})


module.exports = article

// sempre que criar um novo relacionamento deve se atualizar o banco de dados