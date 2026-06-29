import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Khalid Sanawer",
              "url": "https://khalidsanawer.online",
              "image": "https://khalidsanawer.online/khalid.jpg",
              "jobTitle": "Security Researcher & Full-Stack Developer",
              "description": "Pakistan-based penetration tester and Next.js developer with 1200+ sites tested.",
              "worksFor": {
                "@type": "Organization",
                "name": "AuditWave Security"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pakistan",
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
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
