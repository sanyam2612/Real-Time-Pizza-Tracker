const Menu = require('../../models/menu')
function homeController() {
    //factory function returns object
    return {
        // CRUD - Create,Read,Update,Delete
        async index(req, res) {
            const pizzas = await Menu.find()
            // console.log(pizzas)
            return res.render('home', { pizzas: pizzas })
        }
    }
}

module.exports = homeController