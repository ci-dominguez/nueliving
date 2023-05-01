import Layout from '@component/components/Layout';
import ProductItem from '@component/components/ProductItem';
import Product from '@component/models/Product';
import { Store } from '@component/utils/Store';
import db from '@component/utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // Add a Handler to the quantity button in order to change quantity value here VVVV
  const addToCartHandler = async (product) => {
    //searching if items already exists. In order to update quantities correctly
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    //checking if quantity in stock of item is >= quantity in cart
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock.');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="home">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
