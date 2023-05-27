import Layout from '@component/components/Layout';
import ProductItem from '@component/components/ProductItem';
import Product from '@component/models/Product';
import { Store } from '@component/utils/Store';
import db from '@component/utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="lg:flex lg:flex-row">
        <div className="relative text-center px-6 sm:px-20 lg:pr-5">
          <Link href="/catalog">
            <Image
              src="/../public/images/ripple.webp"
              alt="Newest Collections"
              width="2000"
              height="2000"
              className="xl:w-[475px] 3xl:w-[750px]"
            />
            <div className="absolute top-1/3 left-[65px] sm:left-[157px] md:left-[230px] xl:left-[180px] text-xl sm:text-4xl text-white font-ade lg:left-[125px] 3xl:text-6xl 3xl:left-[245px]">
              <h1>NEWEST</h1>
              <h1>COLLECTIONS</h1>
            </div>
          </Link>
        </div>
        <div className="hidden lg:block text-md sm:text-xl md:text-2xl font-morisemibold text-[#924747] lg:w-1/2 lg:pr-16 lg:text-3xl lg:my-auto xl:w-1/3 xl:mx-auto xl:text-4xl 3xl:text-6xl">
          <h2 className="lg:text-center">REFRESH YOUR SANCTUARY</h2>
          <p className="text-black pt-2 lg:text-2xl lg:text-center lg:pt-10 xl:text-3xl 3xl:text-5xl">
            Based on a passion for authentic design and with responsibility at
            the heart of every choice we make, we create honest products and
            calm environments that inspire you to take control of, and balance
            the contrasts in your everyday lifestyle.
          </p>
        </div>
      </div>

      <div className="text-center py-10 px-6 sm:px-20">
        <div className="text-md sm:text-xl md:text-2xl font-morisemibold text-[#924747] lg:hidden">
          <h2>REFRESH YOUR SANCTUARY</h2>
          <p className="text-black pt-2">
            Based on a passion for authentic design and with responsibility at
            the heart of every choice we make, we create honest products and
            calm environments that inspire you to take control of, and balance
            the contrasts in life.
          </p>
        </div>
        <div>
          <h1 className="font-moriextralight text-2xl sm:text-4xl pt-10 pb-4 lg:text-left 3xl:text-5xl">
            LAST CHANCE ITEMS
          </h1>
          <div className="flex flex-col pb-10">
            <div className="lg:flex lg:flex-row 4xl:space-x-20">
              <ProductItem
                product={products[0]}
                key={products[0].slug}
                addToCartHandler={addToCartHandler}
                className="bg-imgbg lg:w-1/3 4xl:w-2/3"
                id="prod0"
              />
              <ProductItem
                product={products[1]}
                key={products[1].slug}
                addToCartHandler={addToCartHandler}
                className="bg-imgbgalt my-4 lg:w-1/3 4xl:w-2/3 lg:my-0"
                id="prod1"
              />
              <ProductItem
                product={products[2]}
                key={products[2].slug}
                addToCartHandler={addToCartHandler}
                className="bg-imgbg lg:w-1/3 4xl:w-2/3"
                id="prod2"
              />
            </div>
            <div className="mt-4 md:mt-10 lg:text-left">
              <a
                href="/catalog"
                className="font-moriextralight text-2xl sm:text-3xl underline 3xl:text-4xl"
              >
                Shop our soon-to-be out of stock items.
              </a>
            </div>
          </div>
          <div className="py-10">
            <h1 className="text-left text-2xl font-ade sm:text-4xl 3xl:text-5xl">
              LIVING GREEN
            </h1>
            <h2 className="text-left font-moriextralight text-lg sm:text-2xl 3xl:text-4xl 3xl:pb-4">
              dedication to outdoor and botanic living.
            </h2>
            <div className="lg:flex lg:flex-row lg:mb-10 4xl:space-x-20">
              <ProductItem
                product={products[5]}
                key={products[5].slug}
                addToCartHandler={addToCartHandler}
                className="bg-imgbg mt-4 lg:w-1/3 4xl:w-2/3 lg:mt-0"
              />
              <ProductItem
                product={products[4]}
                key={products[4].slug}
                addToCartHandler={addToCartHandler}
                className="bg-imgbgalt my-4 lg:w-1/3 4xl:w-2/3 lg:my-0"
              />
              <ProductItem
                product={products[3]}
                key={products[3].slug}
                addToCartHandler={addToCartHandler}
                className="bg-imgbg mb-4 md:mb-10 lg:w-1/3 4xl:w-2/3 lg:mb-0"
              />
            </div>
            <div className="mt-4 md:mt-10 lg:text-left">
              <a
                href="/catalog"
                className="font-moriextralight text-2xl sm:text-3xl pb-2 underline 3xl:text-4xl"
              >
                See our full selection of outdoor and sustainable products.
              </a>
            </div>
          </div>
          <div className="py-10 flex flex-col">
            <h1 className="text-xl font-ade pb-4 sm:text-4xl md:pb-10 3xl:text-5xl">
              SHOP BY CATEGORY
            </h1>
            <div className="hidden lg:flex lg:mx-auto lg:flex-row 4xl:space-x-20">
              <Link href="/catalog">
                <div className="relative text-center">
                  <Image
                    src="/../public/images/cattextileslg.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-[250px] 3xl:w-[350px]"
                  />
                  <h1 className="absolute text-white font-morisemibold top-1/2 left-[25px] xl:left-[50px] 3xl:left-[70px] xl:text-2xl 3xl:text-4xl 4xl:left-[95px]">
                    TEXTILES
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center">
                  <Image
                    src="/../public/images/catlightinglg.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-[250px] 3xl:w-[350px]"
                  />
                  <h1 className="absolute text-white font-morisemibold top-1/2 left-[25px] xl:left-[50px] 3xl:left-[70px] 4xl:left-[90px] xl:text-2xl 3xl:text-4xl">
                    LIGHTING
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center">
                  <Image
                    src="/../public/images/catfurniturelg.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-[250px] 3xl:w-[350px]"
                  />
                  <h1 className="absolute text-white font-morisemibold top-1/2 left-[20px] xl:left-[45px] 3xl:left-[50px] xl:text-2xl 3xl:text-4xl 4xl:left-[65px]">
                    FURNITURE
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center">
                  <Image
                    src="/../public/images/catoutdoorslg.jpg"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-[250px] 3xl:w-[350px]"
                  />
                  <h1 className="absolute text-white font-morisemibold top-1/2 left-[20px] xl:left-[45px] 3xl:left-[50px] 4xl:left-[70px] xl:text-2xl 3xl:text-4xl">
                    OUTDOORS
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center">
                  <Image
                    src="/../public/images/catdecorlg.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-[250px] 3xl:w-[350px]"
                  />
                  <h1 className="absolute text-white font-morisemibold top-1/2 left-[30px] xl:left-[55px] 3xl:left-[80px] 4xl:left-[110px] xl:text-2xl 3xl:text-4xl">
                    DECOR
                  </h1>
                </div>
              </Link>
            </div>
            <div className="space-y-4 lg:hidden">
              <Link href="/catalog">
                <div className="relative text-center mb-4">
                  <Image
                    src="/../public/images/cattextiles.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-full"
                  />
                  <h1 className="absolute top-[40px] left-[50px] sm:top-[85px] sm:left-[110px] md:top-[110px] md:left-[170px] text-3xl sm:text-5xl text-white font-morisemibold">
                    TEXTILES
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center mb-4">
                  <Image
                    src="/../public/images/catlighting.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-full"
                  />
                  <h1 className="absolute top-[40px] left-[50px] sm:top-[85px] sm:left-[110px] md:top-[110px] md:left-[170px] text-3xl sm:text-5xl text-white font-morisemibold">
                    LIGHTING
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center mb-4">
                  <Image
                    src="/../public/images/catfurniture.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-full"
                  />
                  <h1 className="absolute top-[40px] left-[40px] text-3xl sm:top-[80px] sm:left-[80px] md:top-[120px] md:left-[150px] sm:text-5xl text-white font-morisemibold">
                    FURNITURE
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center mb-4">
                  <Image
                    src="/../public/images/catoutdoors.jpg"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-full"
                  />
                  <h1 className="absolute top-[40px] left-[40px] text-3xl sm:top-[80px] sm:left-[80px] md:top-[120px] md:left-[150px] sm:text-5xl text-white font-morisemibold">
                    OUTDOORS
                  </h1>
                </div>
              </Link>
              <Link href="/catalog">
                <div className="relative text-center">
                  <Image
                    src="/../public/images/catdecor.webp"
                    alt="Newest Collections"
                    width="1000"
                    height="1000"
                    className="w-full"
                  />
                  <h1 className="absolute top-[40px] left-[70px] sm:top-[85px] sm:left-[145px] md:top-[120px] md:left-[210px] text-3xl sm:text-5xl text-white font-morisemibold">
                    DECOR
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
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
