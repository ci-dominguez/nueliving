import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@component/components/Layout';
import CheckoutHead from '@component/components/CheckoutHead';
import { Store } from '@component/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('state', shippingAddress.state);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
    setValue('email', shippingAddress.email);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    firstName,
    lastName,
    address,
    city,
    state,
    postalCode,
    country,
    email,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        firstName,
        lastName,
        address,
        city,
        state,
        postalCode,
        country,
        email,
        location,
      },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          state,
          postalCode,
          country,
          email,
          location,
        },
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Shipping">
      <CheckoutHead activeStep={0} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1>Shipping Address</h1>
        <div>
          <label htmlFor="firstName">Full Name</label>
          <input
            className="w-full border-2"
            id="firstName"
            autoFocus
            {...register('firstName', {
              required: 'Please enter first name',
            })}
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            className="w-full border-2"
            id="lastName"
            autoFocus
            {...register('lastName', {
              required: 'Please enter last name',
            })}
          />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            className="w-full border-2"
            {...register('address', {
              minLength: {
                value: 3,
                message: 'An address is longer than 2 characters',
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            className="w-full border-2"
            id="city"
            {...register('city', {
              required: 'Please enter a city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            className="w-full border-2"
            id="state"
            {...register('state', {
              required: 'Please enter a state',
            })}
          />
          {errors.state && (
            <div className="text-red-500">{errors.state.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full border-2"
            id="postalCode"
            {...register('postalCode', {
              required: 'Please enter a postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            className="w-full border-2"
            id="country"
            {...register('country', {
              required: 'Please enter a country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="w-full border-2"
            id="email"
            {...register('email', {
              required: 'Please enter a email',
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
