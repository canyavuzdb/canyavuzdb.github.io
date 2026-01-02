import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/header";
import ActiveLinkContextProvider from "@/context/active-link-context";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCY | Personal Portfolio",
  description:
    "MCY is a full stack software developer with +1 years of real time experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} text-white relative h-screen w-full overflow-hidden flex flex-col items-center justify-center`}
      >
        <ActiveLinkContextProvider>
          <div className="geometric-shape"></div>
          <div className="relative w-full max-w-[50rem] h-full flex flex-col justify-center z-10 box-border px-6 md:px-0">
            {/* Header: Fixed Top on Mobile, Left Sidebar on Desktop */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 md:absolute md:right-[100%] md:top-0 md:h-full md:flex md:items-center md:pr-6 md:bottom-auto md:left-auto md:translate-x-0">
                <Header />
            </div>
            {children}
          </div>
        </ActiveLinkContextProvider>
      </body>
    </html>
  );
}
