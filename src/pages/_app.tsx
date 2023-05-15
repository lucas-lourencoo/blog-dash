import { globalStyles } from "@/styles/global";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <SessionProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1.25rem" }, duration: 6000 }}
      />
    </SessionProvider>
  );
}
