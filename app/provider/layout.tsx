import { ProviderContextProvider } from "@/context/ProviderContext";
import { Toaster } from "@/components/ui/toaster";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderContextProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>

        {/* Global Toast Notifications */}
        <Toaster />
      </div>
    </ProviderContextProvider>
  );
}

