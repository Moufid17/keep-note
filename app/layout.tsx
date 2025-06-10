import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Keep note",
  description: "A simple note-taking app",
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: "/site.webmanifest",
  // themeColor: "#000000",
  // openGraph: {
  //   title: "Keep note",
  //   description: "A simple note-taking app",
  //   url: "https://keepnote.vercel.app",
  //   siteName: "Keep note",
  //   images: [
  //     {
  //       url: "https://keepnote.vercel.app/og.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Keep note",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen w-full">
            <main className="flex flex-1 flex-col px-4 xl:px-8">
              {children}
            </main>
            <Toaster richColors/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
