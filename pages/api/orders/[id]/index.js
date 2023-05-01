const { default: Order } = require('@component/models/Order');
const { default: db } = require('@component/utils/db');

const handler = async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;
