import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}
export default function Home({ product }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            Hey, welcome <span>React</span> world.
          </h1>
          <p>
            Get access to all the published <br />
            <span>for $ {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="images/avatar/svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JHrPiI7Xn2JXcXs4g5Ip6pF', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};

// três formas de chamada api
// client-side

// server-side
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1JHrPiI7Xn2JXcXs4g5Ip6pF', {
//     expand: ['product'],
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100),
//   };

//   return {
//     props: {
//       product,
//     },
//   };
// };

// static-side
// export const getStaticProps: GetStaticProps = async () => {
//   const price = await stripe.prices.retrieve('price_1JHrPiI7Xn2JXcXs4g5Ip6pF', {
//     expand: ['product'],
//   });
//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100),
//   };

//   return {
//     props: {
//       product,
//     },
//     revalidate: 60 * 60 * 24, // 24hours
//   };
// };
