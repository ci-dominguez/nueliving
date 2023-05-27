import React from 'react';

export default function CheckoutHead({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['Shipping', 'Place Order'].map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center
            ${
              //active step = indigo, and inactive = gray
              index <= activeStep
                ? 'border-yellow-600 text-yellow-600'
                : 'border-gray-400 text-gray-400'
            }
            `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
