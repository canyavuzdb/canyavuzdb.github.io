import type { Metadata } from "next";
import "./globals.css";
import ActiveLinkContextProvider from "@/context/active-link-context";
import AtmosphericBackground from "@/components/atmospheric-background";
import ThemeToggle from "@/components/theme-toggle";


export const metadata: Metadata = {
  title: "Can Yavuz | Full Stack Developer",
  description:
    "Can Yavuz is a full stack software developer with +1 years of real time experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" data-theme="day">
      <head>
        <link id="theme-favicon" rel="icon" type="image/svg+xml" href="/favicon-dark.svg" />
      </head>
      <body
        className="text-white relative min-h-screen w-full overflow-x-hidden"
      >
        <ActiveLinkContextProvider>
          <AtmosphericBackground />
          <ThemeToggle />
          <div className="portfolio-column relative z-10 mx-auto flex min-h-screen w-full max-w-[50rem] flex-col justify-start px-6 md:px-12">
            {children}
          </div>
        </ActiveLinkContextProvider>
      </body>
    </html>
  );
}
