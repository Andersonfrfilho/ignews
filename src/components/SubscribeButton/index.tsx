import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import styles from './styles.module.scss';
// três lugares para fazer operações de segurança no next
// * getServerSideProps (SSR) ao montar a pagina
// * getStaticProps (SSG) ao montar a pagina
// * API routes ação do usuário

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({
  priceId,
}: SubscribeButtonProps): JSX.Element {
  const [session] = useSession();

  async function handleSubscribe(): any {
    if (!session) {
      signIn('github');
      return;
    }
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
