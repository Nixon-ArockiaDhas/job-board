import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JobProvider } from "./context/jobContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Board Application",
  description: "SAmple Job Board Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JobProvider>{children}</JobProvider>
      </body>
    </html>
  );
}
