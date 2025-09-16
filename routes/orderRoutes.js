const router = require('express').Router();
const Order = require('../models/Order');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// CREATE order
router.post('/', auth, async (req, res) => {
  try {
    const { orderType, items, totalAmount, createdBy } = req.body;

    // Validate that all items are available before processing
    for (const item of items) {
      const dbItem = await Item.findById(item.itemId);
      if (!dbItem) {
        return res.status(400).json({ error: `Item "${item.name}" not found` });
      }
      if (!dbItem.isAvailable) {
        return res.status(400).json({ error: `Item "${item.name}" is currently unavailable` });
      }
    }

    // Create the order
    const order = await Order.create({
      orderType,
      items,
      totalAmount,
      createdBy
    });

    res.json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// LIST order history
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;