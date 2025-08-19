// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PZ5WLT9P');`
                    }}
                />
                {/* End Google Tag Manager */}
                <meta name="google-site-verification" content="ut-7H-7I4dV1jGxUBNa99hG1UxBjEYRj3MMsGQ5Bz5Q"/>
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"/>
                <meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="color-scheme" content="light dark"/>

            </Head>
            <body>
            {/* Google Tag Manager (noscript) */}
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZ5WLT9P"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                }}
            />
            {/* End Google Tag Manager (noscript) */}
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}