import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({
  priceId,
}: SubscribeButtonProps): JSX.Element {
  return (
    <button type="button" className={styles.signInButton}>
      Subscribe now
    </button>
  );
}
