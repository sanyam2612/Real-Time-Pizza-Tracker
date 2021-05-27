const Order = require('../../../models/order')
const moment = require('moment')
function orderController() {
    return {
        index(req, res) {
            // $ne is for not equal
            // populate - we are fetching users record by its customerId, that what populate fn does - it fir=ts all data corressponding to customerId
            // We donot want password by population, therefore -password and exec() stands for execute - it recieves two paramneter error and the result whic in our case we named as orders
            Order.find({ status: { $ne: 'completed' } }).populate('customerId', '-password').exec((err, orders) => {

                res.render('admin/orders', { orders: orders, moment: moment })
            })
        }
    }
}
module.exports = orderController