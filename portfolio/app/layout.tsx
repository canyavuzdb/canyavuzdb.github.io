import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ActiveLinkContextProvider from "@/context/active-link-context";
import AtmosphericBackground from "@/components/atmospheric-background";
import ThemeToggle from "@/components/theme-toggle";


const dmSans = DM_Sans({ subsets: ["latin"] });

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
    <html lang="en" className="!scroll-smooth" data-theme="day">
      <body
        className={`${dmSans.className} text-white relative min-h-screen w-full overflow-x-hidden`}
      >
        <ActiveLinkContextProvider>
          <AtmosphericBackground />
          <ThemeToggle />
          <div className="portfolio-column relative z-10 mx-auto flex min-h-screen w-full max-w-[43rem] flex-col justify-center px-6 md:px-10">
            {children}
          </div>
        </ActiveLinkContextProvider>
      </body>
    </html>
  );
}
