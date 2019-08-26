const mongoose = require('mongoose');

const shema = new mongoose.Schema({
    list: Array,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    status: {
        type: Number,
        default: 0//0:待付款  1:待取茶  2:待评价   3:完成
    }
})

const Order = mongoose.model('order', shema);

module.exports = Order;