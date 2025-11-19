import type { Metadata } from "next";
import Script from "next/script";
import { fetchGrobal } from "@/lib/wp";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await fetchGrobal();
  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteIconUrl, siteTitle, siteSubTitle } = await fetchGrobal();
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JQFMENZWQB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JQFMENZWQB');
          `}
        </Script>
        <Header logoSrc={siteIconUrl ?? ""} siteTitle={siteTitle} />
        {children}
        <Footer logoSrc={siteIconUrl ?? ""} siteTitle={siteTitle} siteSubtitle={siteSubTitle} />
      </body>
    </html>
  );
}
