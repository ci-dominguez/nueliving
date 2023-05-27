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
      <div className="px-6 sm:px-20 pb-20">
        <div className="py-2 md:text-2xl">
          <Link href="/">
            {'<- '} {product.main} / {product.sub}
          </Link>
        </div>
        <div className="grid md:gap-3">
          <div className="lg:flex lg:flex-row lg:space-x-4">
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                sizes="100vw"
                className=""
              ></Image>
            </div>
            <div className="lg:w-1/2">
              <ul>
                <li>
                  <h1 className="text-2xl font-moriregular pt-6 pb-2 sm:text-3xl md:text-4xl lg:pt-0">
                    {product.name}
                  </h1>
                </li>
                <li className="text-lg font-moriextralight pb-2 sm:text-xl md:text-2xl">
                  <b>Description:</b> {product.description}
                </li>
              </ul>
              <div className="hidden xl:flex 2xl:pt-10">
                <div className="card p-5 md:text-3xl">
                  <div className="mb-2 flex justify-between md:mb-10">
                    <div>Price</div>
                    <div>${product.price}</div>
                  </div>
                  <div className="mb-2 md:mb-10 flex justify-between">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </div>
                  </div>
                  <button
                    className="primary-button w-full mb-4 md:mb-10"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                  <span className="text-lg font-moriextralight md:text-3xl">
                    {product.rating} Star Rating from 283 customers!
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:hidden">
            <div className="card p-5 md:text-3xl">
              <div className="mb-2 flex justify-between md:mb-10">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 md:mb-10 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
              <button
                className="primary-button w-full mb-4 md:mb-10"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
              <span className="text-lg font-moriextralight md:text-3xl">
                {product.rating} Star Rating from 283 customers!
              </span>
            </div>
          </div>
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
