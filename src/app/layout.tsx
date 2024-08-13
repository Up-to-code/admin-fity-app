import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Manu from "@/components/base/Manu";

const cairo = Cairo({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "admin-fity-app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={cairo.className + " bg-gray-50 min-h-screen"}>
        <main className="flex min-h-screen h-max">
          <Manu />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
