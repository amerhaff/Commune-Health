import type React from "react"
import { useState, useRef } from "react"
import { ArrowRight, CalendarCheck, DollarSign, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const contactFormRef = useRef<HTMLFormElement>(null) // Ref for the contact form

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { name, email, company, role })
    // Simple alert instead of toast
    alert("Thanks for your interest! We'll be in touch soon to discuss how Simpliwell can benefit your organization.")
    setName("")
    setEmail("")
    setCompany("")
    setRole("")
  }

  const handleLearnMoreClick = () => {
    // Scroll to the contact form
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <a className="flex items-center space-x-2" href="/">
            <img src="/api/placeholder/150/40" alt="Simpliwell" className="h-10 w-auto" />
          </a>
          <nav className="flex items-center space-x-4">
            <Button asChild className="rounded-full" style={{ backgroundColor: "#1400FF" }}>
              <a href="/login">Login</a>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
                Affordable
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Patient-Centric
                </span>
                <br />
                Health Benefits
                <br />
                for Your Employees
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simpliwell provides your business with healthcare at greater value,ensuring your employees stay healthy
                and productive.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="rounded-full" onClick={handleLearnMoreClick}>
                <a href="#contact-form">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tighter text-center mb-12 sm:text-4xl md:text-5xl">
              <span style={{ fontSize: "100%" }}>Why Simpliwell?</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              <Card className="relative flex flex-col items-center p-6">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                <div className="flex justify-center items-center mb-4">
                  <CalendarCheck className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-center">Unlimited Access</CardTitle>
                <CardContent className="mt-4 text-center">
                  <p className="text-gray-500 font-normal">
                    Eliminate waiting times and reduce sick days with instant access to care. Your employees get 24/7
                    virtual consultations, same-day in-person visits, and direct messaging with their dedicated primary
                    care team - no gatekeepers or long wait times.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative flex flex-col items-center p-6">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                <div className="flex justify-center items-center mb-4">
                  <DollarSign className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-center">Greater Value</CardTitle>
                <CardContent className="mt-4 text-center">
                  <p className="text-gray-500 font-normal">
                    Cut healthcare costs while providing better care. Our direct care model eliminates middlemen,
                    administrative bloat, and surprise bills, delivering premium healthcare at predictable, affordable
                    rates.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative flex flex-col items-center p-6">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                <div className="flex justify-center items-center mb-4">
                  <HeartPulse className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-center">Reduced Healthcare Spend</CardTitle>
                <CardContent className="mt-4 text-center">
                  <p className="text-gray-500 font-normal">
                    Transform reactive healthcare spending into proactive health management. Our preventive care
                    approach and unlimited access reduce emergency visits and specialist referrals, leading to healthier
                    employees and significant long-term savings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1400FF] text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Employee Healthcare?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Get in touch to learn how Simpliwell can benefit your organization and employees.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl" ref={contactFormRef} id="contact-form">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-full px-6 bg-white text-black placeholder-gray-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-full px-6 bg-white text-black placeholder-gray-500"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full rounded-full px-6 bg-white text-black placeholder-gray-500"
                  />
                </div>
                <div>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="w-full rounded-full px-6 bg-white text-black placeholder-gray-500">
                      <SelectValue placeholder="Your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-white">
                      <SelectItem value="hr" className="text-black">
                        HR Manager
                      </SelectItem>
                      <SelectItem value="benefits" className="text-black">
                        Benefits Administrator
                      </SelectItem>
                      <SelectItem value="provider" className="text-black">
                        Provider
                      </SelectItem>
                      <SelectItem value="broker" className="text-black">
                        Broker
                      </SelectItem>
                      <SelectItem value="executive" className="text-black">
                        Executive
                      </SelectItem>
                      <SelectItem value="other" className="text-black">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full rounded-full bg-black text-white hover:bg-gray-800">
                    Request Information
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center justify-between px-4">
          <p className="text-sm text-gray-500">© 2024 Simpliwell. All rights reserved.</p>
          <nav className="flex items-center space-x-4">
            <a className="text-sm text-gray-500 hover:text-blue-600" href="#">
              Terms
            </a>
            <a className="text-sm text-gray-500 hover:text-blue-600" href="#">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

