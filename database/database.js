const Sequelize = require('sequelize')
                                //nome do banco, usuario, senha
const connection = new Sequelize('guiapress','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    tamezone: '-03:00'
})

module.exports = connection