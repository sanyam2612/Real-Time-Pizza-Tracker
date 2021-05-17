function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
            // let cart={
            //     items:{
            //         pizzaId:{item:PizzaObject,qty:0}
            //     },
            //     totalQty:0,
            //     totalPrice:0
            // }

            // Creating cart if it doesnot exist in sessions
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            // If cart exist in session

            let cart = req.session.cart
            // console.log(req.body)
            // Check if selecetd item already exists in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }


            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController