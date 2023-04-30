import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@component/utils/Store';

const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Head>
        <title>{title ? title + ' - nueLIVING' : 'nueLIVING'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <div className="text-center">FREE SHIPPING ON ALL ORDERS*</div>
          <nav className="flex flex-row shadow-sm justify-between items-center px-4">
            <div className="flex h-12 items-center">
              <Link href="/catalog" className="pr-2">
                CATALOG
              </Link>
              <Link href="/bestsellers" className="pr-2">
                BEST SELLERS
              </Link>
              <Link href="/comingsoon" className="pr-2">
                COMING SOON
              </Link>
              <Link href="/greenliving" className="">
                GREENLIVING
              </Link>
            </div>
            <div>
              <Link href="/" className="font-bold">
                nueLiving
              </Link>
            </div>
            <div className="flex flex-row">
              <div>Search</div>
              <Link href="/favorites">Favs</Link>
              <Link href="/cart">
                Cart
                {cart.cartItems.length > 0 && (
                  <span>
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright &copy; 2023 nueLIVING</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
