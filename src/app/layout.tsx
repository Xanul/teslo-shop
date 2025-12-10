import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Teslo | Shop",
  },
  description: "Virtual store of Teslo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          {children}
          <Toaster
            position="top-center"
            richColors
            expand={false}
            duration={3000}
          />
        </UserProvider>
      </body>
    </html>
  );
}
