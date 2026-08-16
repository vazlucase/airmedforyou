import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { CONTACT, SITE } from "@/lib/constants";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
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
  themeColor: "#0a1220",
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
    <html lang="pt-BR" className={`${montserrat.variable}`}>
      <body className="flex min-h-svh flex-col bg-paper pb-[calc(4rem+env(safe-area-inset-bottom))] antialiased lg:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
            href="#conteudo"
            className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Pular para o conteúdo
          </a>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
        <MobileActionBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
