import React from 'react';
import Layout from '@component/components/Layout';

export default function contact() {
  return (
    <Layout title="Contact">
      <div className="pb-10 space-y-4 text-md px-6 sm:px-20 font-moriextralight md:pt-10 xl:pt-20 3xl:px-48">
        <h1 className="text-2xl sm:text-4xl font-ade pb-2 text-center xl:pb-10">
          CONTACT
        </h1>
        <p className="sm:text-2xl">
          Any questions? Comments? Concerns about your order?
        </p>
        <p className="sm:text-2xl">Feel free to reach out to us:</p>
        <ul className="sm:text-2xl">
          <li>
            <span className="font-moriregular">Phone:</span> (619) 393 2880
          </li>
          <li>
            <span className="font-moriregular">Email:</span> hello@nueliving.com
          </li>
          <li>
            <span className="font-moriregular">Facility:</span> 2822 Almeda Dr
            San Diego, CA 92113
          </li>
        </ul>
      </div>
    </Layout>
  );
}
