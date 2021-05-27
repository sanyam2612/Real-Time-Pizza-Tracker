const Order = require('../../../models/order')
const moment = require('moment')
function orderController() {
    return {
        store(req, res) {
            // console.log(req.body)

            // Validate Request
            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', "All fields are required")
                res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then(result => {
                req.flash('success', 'Order placed successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id })
            res.header('Cache-Control', 'no-store')
            res.render('customers/orders', { orders: orders, moment: moment })

        }
    }

}

module.exports = orderController