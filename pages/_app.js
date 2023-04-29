import '@component/styles/globals.css';
import { StoreProvider } from '@component/utils/Store';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
