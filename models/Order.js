const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderType: { type: String, enum: ['dine-in','take-out','delivery'], default: 'dine-in' },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number,
  // Removed status field
  // status: { type: String, enum: ['Pending','In Progress','Completed'], default: 'Pending' },
  createdBy: { type: String }, // username
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);