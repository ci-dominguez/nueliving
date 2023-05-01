import Product from '@component/models/Product';
import data from '@component/utils/data';
import db from '@component/utils/db';

const handler = async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
