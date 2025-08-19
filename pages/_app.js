import '../styles/globals.css'
import Layout from "../components/layout/Layout";
import { Analytics } from "@vercel/analytics/next";
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { ThemeProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Layout>
                <DefaultSeo {...SEO} />
                <Component {...pageProps} />
                <Analytics />
            </Layout>
        </ThemeProvider>
    );
}

export default MyApp;
