import type { Metadata, Viewport } from "next";
import { Raleway, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CONTACT, SITE } from "@/lib/constants";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — UTI Aérea, Voos Executivos e ClubMed`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "UTI aérea",
    "remoção aeromédica",
    "voo executivo",
    "ClubMed",
    "transporte aeromédico",
    "aeromedical",
    "Belém",
    "Pará",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — UTI Aérea, Voos Executivos e ClubMed`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — UTI Aérea, Voos Executivos e ClubMed`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00203f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    telephone: CONTACT.phoneDigits,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CONTACT.addressLine1}, ${CONTACT.addressLine2}`,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.state,
      addressCountry: "BR",
    },
    openingHours: "Mo-Su 00:00-23:59",
    medicalSpecialty: "Emergency",
  };

  return (
    <html lang="pt-BR" className={`${raleway.variable} ${poppins.variable}`}>
      <body className="flex min-h-svh flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
