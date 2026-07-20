import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://khalidsanawer.online'),
  title: 'Khalid Sanawer — Security Researcher & Full-Stack Developer',
  description: 'Pakistan-based penetration tester and Next.js developer. VAPT, web development, and video production. 1200+ sites tested, EC-Council certified.',
  keywords: ['penetration testing', 'VAPT', 'web development', 'security researcher', 'Next.js developer', 'bug bounty', 'WordPress security', 'Pakistan'],
  authors: [{ name: 'Khalid Sanawer' }],
  openGraph: {
    type: 'website',
    url: 'https://khalidsanawer.online',
    title: 'Khalid Sanawer — Security Researcher & Full-Stack Developer',
    description: 'VAPT, web development, and video production. 1200+ sites tested.',
    images: [{ url: '/khalid.jpg', width: 800, height: 600 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khalid Sanawer — Security Researcher & Full-Stack Developer',
    description: 'VAPT, web development, and video production.',
    images: ['/khalid.jpg'],
  },
  robots: { index: true, follow: true },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://khalidsanawer.online/#person",
      "name": "Khalid Sanawer",
      "url": "https://khalidsanawer.online",
      "image": "https://khalidsanawer.online/khalid.jpg",
      "jobTitle": "Security Researcher & Full-Stack Developer",
      "description": "Pakistan-based penetration tester and Next.js developer with 1200+ sites tested.",
      "worksFor": {
        "@id": "https://khalidsanawer.online/#organization"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PK"
      },
      "email": "security@khalidsanawer.online",
      "sameAs": [
        "https://hackerone.com/cyberarmor72"
      ],
      "knowsAbout": [
        "Penetration Testing",
        "VAPT",
        "Web Application Security",
        "Next.js",
        "MERN Stack",
        "WordPress Security"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://khalidsanawer.online/#organization",
      "name": "AuditWave Security",
      "url": "https://khalidsanawer.online",
      "logo": "https://khalidsanawer.online/khalid.jpg",
      "image": "https://khalidsanawer.online/khalid.jpg",
      "description": "Cybersecurity VAPT audits, web application security, and secure development services.",
      "founder": {
        "@id": "https://khalidsanawer.online/#person"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PK"
      },
      "brand": [
        {
          "@type": "Brand",
          "name": "AuditWave Security"
        },
        {
          "@type": "Brand",
          "name": "Pixvault"
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph)
          }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
