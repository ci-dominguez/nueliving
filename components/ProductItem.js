/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

export default function ProductItem({ product, addToCartHandler, className }) {
  return (
    <div className={className}>
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="p-4 sm:p-6 md:p-10 3xl:p-12"
        />
      </Link>
      <div className="flex flex-col pl-4 sm:pl-6 md:pl-10 3xl:pl-12">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-xl font-moriextralight uppercase text-left md:text-3xl lg:text-xl 3xl:text-3xl">
            {product.name}
          </h2>
        </Link>
        <p className="text-left font-moriregular text-lg md:text-2xl lg:text-xl 3xl:text-2xl">
          {product.price}.00
          <span className="pl-2 opacity-75">{product.color}</span>
        </p>
        <button
          className="mr-auto font-morisemibold py-4 text-md md:text-xl md:pb-10 3xl:text-2xl"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}
