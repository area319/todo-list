import React from 'react'
import type { Metadata } from "next"
import Header from '%/components/layout/header';
import "./globals.css"
import Footer from '%/components/layout/footer';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {/* Have to inter font to body */}
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
