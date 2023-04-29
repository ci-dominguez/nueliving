import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@component/components/Layout';
import Image from 'next/image';
import React from 'react';
import data from '@component/utils/data';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
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
              <button type="button">Add to Cart</button>
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
