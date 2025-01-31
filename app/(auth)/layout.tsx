import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src="/Simpliwell_logo.png"
              alt="Simpliwell"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <nav className="flex items-center space-x-4">
            <Button
              onClick={() => {
                // Here you would typically implement logout functionality
                window.location.href = '/'
              }}
              className="rounded-full"
              style={{ backgroundColor: '#1400FF' }}
            >
              Logout
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2024 Simpliwell. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

