import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@component/components/Layout';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import Product from '@component/models/Product';
import db from '@component/utils/db';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return (
      <Layout title="Missing">
        <div>
          <h1>Product Not Found.</h1>
          <Link href="/">Get To Shopping!</Link>
        </div>
      </Layout>
    );
  }

  // Add a Handler to the quantity button in order to change quantity value here VVVV
  const addToCartHandler = async () => {
    //searching if items already exists. In order to update quantities correctly
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    //checking if quantity in stock of item is >= quantity in cart
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock.');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    //Later on create a pop up div that shows cart with two buttons; keep shopping / go to cart instead of redirecting
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products **try to make this bredcrumbs?</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            height={720}
            width={540}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>
              <h2>{product.color}</h2>
            </li>
            <li>
              <h2>USD {product.price}</h2>
            </li>
          </ul>

          <div>
            <button type="button">Add Quantity Button</button>
            <div>
              <button type="button" onClick={addToCartHandler}>
                Add to Cart
              </button>
              <a> Favorites Heart Icon</a>
            </div>
            <div>
              <h2>{product.countInStock} left in stock</h2>
              {product.rating} rating from {product.numReviews} customers
            </div>
          </div>

          <ul>
            <li>
              <h2 className="font-bold">Description &amp; Details</h2>
            </li>
            <li>
              <p>{product.description}</p>
            </li>
            <li>
              <span className="font-bold">Item no. </span>
              {product.itemno}
            </li>
            <li>
              <span className="font-bold">Dimensions: </span>
              {product.dimensions}
            </li>
            <li>
              <span className="font-bold">Material: </span>
              {product.material}
            </li>
            <li>
              <span className="font-bold">Care Instructions: </span>
              {product.care}
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
