import Image from "next/image"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/Simpliwell_logo.png"
            alt="Simpliwell"
            width={200}
            height={53}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-2 text-xl text-gray-600">Please login to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

