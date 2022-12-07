import { FC } from "react";
import Head from "next/head";

export interface MetaProps {
  title: string;
}

const Meta: FC<MetaProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="title" content={title} />
      <meta name="description" content="DESCRIPTION" />
      <meta name="keywords" content="KEYWORDS" />
      <meta name="author" content="YOUR_NAME" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#348CD4" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="SITE_URL" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="DESCRIPTION" />
      <meta property="og:image" content="/assets/logo.png" />
      <meta property="og:site_name" content="SITE_NAME" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="SITE_URL" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content="DESCRIPTION" />
      <meta property="twitter:image" content="/assets/logo.png" />
    </Head>
  );
};

export default Meta;
