import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ProviderContextProvider } from "@/context/ProviderContext";
import { BrokerContextProvider } from "@/context/BrokerContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap both contexts as siblings */}
        <ProviderContextProvider>
          <BrokerContextProvider>
            {/* Pass children to both contexts */}
            {children}
          </BrokerContextProvider>
        </ProviderContextProvider>
        <Toaster />
      </body>
    </html>
  );
}

