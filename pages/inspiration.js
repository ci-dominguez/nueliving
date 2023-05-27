import React from 'react';
import Layout from '@component/components/Layout';

export default function inspiration() {
  return (
    <Layout title="Inspiration">
      <div className="sm:px-20 pb-10 space-y-4 text-md px-6 font-moriextralight md:pt-10 xl:pt-20 3xl:px-48">
        <h1 className="text-2xl font-ade pb-2 text-center sm:text-4xl xl:pb-10">
          WHY WE DO IT
        </h1>
        <p className="sm:text-2xl xl:pb-10">
          Life is full of contrasts. As we navigate expectations and dreams in
          search of meaning and comfort, we long for a balanced life with room
          to be ourselves. A place where we can realize the true value of
          things, and feel at home. Based on a passion for authentic design and
          with responsibility at the heart of every choice we make, we create
          honest products and calm environments that inspire you to balance the
          contrasts in life.
        </p>
        <p className="pb-4 sm:text-2xl xl:pb-6">
          From our home in Copenhagen, we work with artisans around the world,
          fusing our Scandinavian mindset with global skills and traditions. Our
          collections are defined by soft forms, rich textures and curious
          details that let you create composed atmospheres with a touch of the
          unexpected. From materials and processes to production and delivery,
          we challenge ourselves to help shape a sustainable future, making it
          easier for you to make responsible choices. We create collections of
          furniture, accessories and lighting, so you can create space to feel
          comfortably you.
        </p>
        <Link href="/catalog" className="font-morisemibold sm:text-2xl underline">
          Welcome home.
        </Link>
      </div>
    </Layout>
  );
}
