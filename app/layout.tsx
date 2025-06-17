import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "NoteIt - AI-Powered Note Taking",
  description: "NoteIt combines powerful note-taking with AI assistance. Organize, search, and get insights from your notes effortlessly.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  keywords: [
    "note-taking",
    "AI notes",
    "organization",
    "AI assistance",
    "digital notes",
    "note summarization",
    "cross-platform notes",
    "cloud notes",
    "note-taking app",
    "AI productivity",
    "note insights",
    "note archiving",
    "note tagging",
    "note sharing",
    "note security",
    "note synchronization",
    "note reminders",
  ],
  openGraph: {
    title: "NoteIt - AI-Powered Note Taking",
    description: "NoteIt combines powerful note-taking with AI assistance. Organize, search, and get insights from your notes effortlessly.",
    url: "https://noteit-five.vercel.app",
    siteName: "NoteIt",
    images: [
      {
        url: "https://noteit-five.vercel.app/app.svg",
        width: 1200,
        height: 630,
        alt: "NoteIt - AI-Powered Note Taking",
        type: "image/png",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
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
