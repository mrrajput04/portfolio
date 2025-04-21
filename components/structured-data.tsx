import { Metadata } from 'next'

export function generateStructuredData(): Metadata {
  return {
    metadataBase: new URL('https://divesh-kumar-dev.vercel.app'),
    title: 'Divesh Kumar - Backend Developer',
    description: 'Portfolio of Divesh Kumar, a skilled Backend Developer specializing in Node.js, Express.js, and Nest.js with experience in building scalable applications',
    keywords: ['Backend Developer', 'Node.js', 'Express.js', 'Nest.js', 'MySQL', 'MongoDB', 'TypeScript', 'JavaScript', 'API Development', 'Full Stack', 'Web Development', 'Software Engineer'],
    authors: [{ name: 'Divesh Kumar' }],
    creator: 'Divesh Kumar',
    openGraph: {
      title: 'Divesh Kumar - Backend Developer Portfolio',
      description: 'Experienced Backend Developer specializing in Node.js, Express.js and Nest.js with a passion for building high-quality software solutions',
      url: 'https://divesh-kumar-dev.vercel.app',
      siteName: 'Divesh Kumar Portfolio',
      images: [
        {
          url: 'https://divesh-kumar-dev.vercel.app/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Divesh Kumar - Backend Developer',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Divesh Kumar - Backend Developer',
      description: 'Backend Developer specializing in Node.js, Express.js and Nest.js',
      images: ['https://divesh-kumar-dev.vercel.app/opengraph-image.jpg'],
    },
    alternates: {
      canonical: 'https://divesh-kumar-dev.vercel.app',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Divesh Kumar',
    jobTitle: 'Backend Developer',
    url: 'https://divesh-kumar-dev.vercel.app',
    sameAs: [
      'https://github.com/mrrajput04',
      'https://www.linkedin.com/in/diveshkumar03/',
    ],
    image: 'https://divesh-kumar-dev.vercel.app/opengraph-image.jpg',
    description: 'Backend Developer specializing in Node.js, Express.js and Nest.js with experience in building scalable applications',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India',
    },
    email: 'rajpootdivesh5@gmail.com',
    telephone: '+91 8477072098',
  }
}

export function generatePortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Divesh Kumar Portfolio',
    description: 'Portfolio showcasing my skills, projects, and experience as a Backend Developer specializing in Node.js, Express.js, and Nest.js',
    url: 'https://divesh-kumar-dev.vercel.app',
    author: {
      '@type': 'Person',
      name: 'Divesh Kumar',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'WebPage',
            name: 'About',
            description: 'Information about Divesh Kumar and his background as a Backend Developer.',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'WebPage',
            name: 'Skills',
            description: 'Technical skills and expertise in Node.js, Express.js, Nest.js, and other backend technologies.',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'WebPage',
            name: 'Projects',
            description: 'Showcase of completed backend projects and API development work.',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'WebPage',
            name: 'Contact',
            description: 'Contact information and form to get in touch regarding backend development opportunities.',
          },
        },
      ],
    },
  }
} 