import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ActiveLinkContextProvider from "@/context/active-link-context";
import Footer from "@/components/footer";

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
        className={`${inter.className} dark:bg-gray-900 dark:text-gray-50  relative pt-28 sm:pt-36`}
      >
        <div className="bg-[#ffd6d6] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[20rem] sm:w-[68.75rem] "></div>
        <div className="bg-[#d0d0d0] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[20rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] "></div>
        <ActiveLinkContextProvider>
          <Header />
          {children}
          <Footer />
        </ActiveLinkContextProvider>
      </body>
    </html>
  );
}
