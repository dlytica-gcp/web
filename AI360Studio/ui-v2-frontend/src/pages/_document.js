import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
     

      <Script
          src="/js/app.js"
          strategy="afterInteractive"
        ></Script>
        {/* <Script
          src="/js/settings.js"
          strategy="afterInteractive"
        ></Script> */}
        <Script
          src="/js/datatables.js"
          strategy="afterInteractive"
        ></Script>
        <Script
          src="/js/fullcalender.js"
          strategy="afterInteractive"
        ></Script>
        {/* <Script
          src="/js/audience-builder.js"
          strategy="afterInteractive"
        ></Script> */}
        <Script
          src="/js/chart-popup.js"
          strategy="afterInteractive"
        ></Script>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
