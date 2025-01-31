import Link from "next/link"
import { ArrowRight, Building2, CreditCard, LineChart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2" href="#">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">HealthDirect</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/signup">Login / Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Instant, personalized,
                <br />
                affordable{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  health benefits
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Empower your team with comprehensive direct primary care. Simple to manage, easy to use.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Input className="max-w-sm" placeholder="Enter your work email" type="email" />
              <Button asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2">
                <LineChart className="h-10 w-10 text-blue-600" />
                <h3 className="text-sm font-medium">Payroll and carrier integrations</h3>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <CreditCard className="h-10 w-10 text-blue-600" />
                <h3 className="text-sm font-medium">Expense approval flows</h3>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Building2 className="h-10 w-10 text-blue-600" />
                <h3 className="text-sm font-medium">Personalized health plans</h3>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Streamlined Benefits Management
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Manage all your employee health benefits in one place. Track expenses, approve claims, and provide the
                    best care for your team.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="inline-flex">
                    <Link href="/signup">
                      Schedule a Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="relative h-[450px] w-full overflow-hidden rounded-xl border-2 border-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100" />
                  <div className="relative p-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Total Health Spend</h3>
                      <div className="text-4xl font-bold text-blue-600">$4,542.52</div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="h-2 w-full rounded-full bg-blue-200">
                        <div className="h-2 w-2/3 rounded-full bg-blue-600" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Spent: $3,028.35</span>
                        <span>Remaining: $1,514.17</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center justify-between px-4">
          <p className="text-sm text-gray-500">© 2024 HealthDirect. All rights reserved.</p>
          <nav className="flex items-center space-x-4">
            <Link className="text-sm text-gray-500 hover:text-blue-600" href="#">
              Terms
            </Link>
            <Link className="text-sm text-gray-500 hover:text-blue-600" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

