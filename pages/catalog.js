import Layout from '@component/components/Layout';
import ProductItem from '@component/components/ProductItem';
import Product from '@component/models/Product';
import { Store } from '@component/utils/Store';
import db from '@component/utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Catalog({ products }) {
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
    <Layout title="catalog">
      <h1 className="text-2xl font-ade pb-2 text-center sm:text-4xl xl:pt-20 xl:pb-10">
        OUR CATALOG
      </h1>
      <div className="px-6 sm:px-20 grid grid-cols-1 gap-4 lg:grid-cols-3 4xl:grid-cols-4 [&>*:nth-child(odd)]:bg-imgbg [&>*:nth-child(even)]:bg-imgbgalt pb-10">
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
