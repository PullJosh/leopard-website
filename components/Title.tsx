import Head from "next/head";

export default function Title({ children }: { children?: string | null }) {
  return (
    <Head>
      <title>{children ? `${children} - Leopard` : "Leopard"}</title>
    </Head>
  );
}
