import axios from 'axios'
import Noty from 'noty'
const moment = require('moment')
export function initAdmin(socket) {

    let orders = []


    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        // Socket
        socket.on('orderPlaced', (order) => {
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'New order!',
                progressBar: false,
            }).show();
            orders.unshift(order)
            res.render('admin/orders', { orders: orders, moment: moment })
        })


    }).catch(err => {
        console.log(err)
    })

}

