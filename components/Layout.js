import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@component/utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import MobileOpen from '../public/icons/mobileopen.svg';
import MobileClose from '../public/icons/mobileclose.svg';
import Bag from '../public/icons/bag.svg';

const Layout = ({ title, children }) => {
  const { state } = useContext(Store);
  const { cart } = state;

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    let ele = document.getElementById('mobile_nav');
    ele.classList.add('hidden');
    let ele2 = document.getElementById('sidecart');
    ele2.classList.remove('hidden');
    let ele3 = document.getElementById('nav');
    ele3.classList.add('flex-row');
    ele3.classList.remove('flex-col');
    let ele4 = document.getElementById('nav');
    ele4.classList.remove('ml-auto');
  };

  const handleMobileNav = () => {
    handleClick();
    let ele = document.getElementById('mobile_nav');
    ele.classList.toggle('hidden');
    let ele2 = document.getElementById('sidecart');
    ele2.classList.toggle('hidden');
    let ele3 = document.getElementById('nav');
    ele3.classList.toggle('flex-col');
    let ele4 = document.getElementById('close');
    ele4.classList.toggle('ml-auto');
  };

  //For Rendering Cart Quantity Badge
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <div className="bg-main">
      <Head>
        <title>{title ? title + ' - nueLIVING' : 'nueLIVING'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col">
        <header>
          <div className="text-center bg-accent px-10 sm:px-24 sm:py-4 sm:text-lg text-sm py-2 font-morisemibold">
            FREE SHIPPING ON ALL ORDERS*
          </div>
          <nav
            id="nav"
            className="flex flex-row justify-between items-center px-10 sm:px-24 py-4"
          >
            <div>
              <Link
                href="/"
                className="text-2xl sm:text-3xl"
                onClick={closeMobileMenu}
              >
                <span className="font-moriregular">nue</span>
                <span className="font-ade">LIVING</span>
              </Link>
            </div>
            <div className="flex flex-row mb-1">
              <div>
                <ul className="hidden lg:inline lg:flex lg:flex-row lg:space-x-10 xl:space-x-20 font-moriextralight text-right sm:text-2xl ml-auto 3xl:text-3xl">
                  <li className="pb-2 pt-4">
                    <Link href="/catalog" onClick={closeMobileMenu}>
                      CATALOG
                    </Link>
                  </li>
                  <li className="pb-2 lg:pt-4">
                    <Link href="/inspiration" onClick={closeMobileMenu}>
                      INSPIRATION
                    </Link>
                  </li>
                  <li className="pb-2 lg:pt-4">
                    <Link href="/contact" onClick={closeMobileMenu}>
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </div>
              <Link
                href="/cart"
                id="sidecart"
                className="text-2xl font-moriregular flex flex-row sm:ml-28 md:ml-44 lg:ml-10 xl:ml-20"
              >
                <Image
                  alt="Shopping Cart"
                  width="20"
                  height="20"
                  src={Bag}
                  className="sm:w-[35px]"
                />
                <span className="font-moriregular pl-1 text-sm pb-2">
                  {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
                </span>
              </Link>
            </div>
            <div className="lg:hidden" onClick={handleMobileNav} id="close">
              {click ? (
                <Image
                  alt="CLOSE MENU"
                  width="20"
                  height="20"
                  src={MobileClose}
                  className="sm:w-[35px]"
                />
              ) : (
                <Image
                  alt="Open Menu"
                  width="20"
                  height="20"
                  src={MobileOpen}
                  className="sm:w-[35px]"
                />
              )}
            </div>

            <ul
              id="mobile_nav"
              className="hidden font-moriextralight text-right sm:text-2xl ml-auto"
            >
              <li className="pb-2 pt-4">
                <Link href="/catalog" onClick={closeMobileMenu}>
                  CATALOG
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/inspiration" onClick={closeMobileMenu}>
                  INSPIRATION
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/contact" onClick={closeMobileMenu}>
                  CONTACT
                </Link>
              </li>
              <li className="pb-2">
                <Link
                  href="/cart"
                  id="sidecart"
                  className="text-2xl font-moriregular flex flex-row"
                >
                  <Image
                    alt="Shopping Cart"
                    width="20"
                    height="20"
                    src={Bag}
                    className="ml-auto sm:w-[35px]"
                  />
                  <span className="font-moriregular pl-1 text-sm pb-2">
                    {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex flex-col shadow-inner bg-accent px-10 sm:px-24 py-16 3xl:py-24">
          <div>
            <h3 className="text-md sm:text-2xl font-ade xl:text-4xl">
              WELCOME TO OUR HOME
            </h3>
            <p className="text-md sm:text-xl font-moriextralight pt-2 xl:text-2xl">
              Subscribe to our newsletter and be among the first to hear about
              new arrivals, events and special offers.
            </p>
            <input className="bg-accent border-black border-b-2 w-5/6 pt-6 3xl:w-3/4"></input>
            <button className="pl-2 md:text-2xl md:pl-4 xl:text-3xl font-moriextralight">
              Join
            </button>
          </div>
          <div className="pt-10">
            <h3 className="text-md sm:text-2xl font-ade xl:text-4xl">
              CONNECT WITH US
            </h3>
            <p className="text-md sm:text-xl font-moriextralight pt-2 xl:text-2xl">
              Be a part of our communities and stay up to date with what we do!
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
