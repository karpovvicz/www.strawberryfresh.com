export default {
    titleTemplate: '%s | StrawberryFresh',
    defaultTitle: 'StrawberryFresh - The Best Content Out There',
    description: 'Your daily editorial of top-voted content from a variety of sources. Fresh, fun, and fruity. Enjoy the best of the web, curated for you.',
    canonical: 'https://strawberryfresh.com',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://strawberryfresh.com',
        siteName: 'StrawberryFresh',
        title: 'StrawberryFresh - The Best Content Out There',
        description: 'Your daily editorial of top-voted content from a variety of sources. Fresh, fun, and fruity.',
        images: [
            {
                url: 'https://strawberryfresh.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'StrawberryFresh',
            },
        ],
    },
    twitter: {
        handle: '@strawberryfresh',
        site: '@strawberryfresh',
        cardType: 'summary_large_image',
    },
    additionalMetaTags: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
        {
            name: 'theme-color',
            content: '#d83e3e',
        },
    ],
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon.ico',
        },
        {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
        },
    ],
};