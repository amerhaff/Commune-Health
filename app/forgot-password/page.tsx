import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-xl text-gray-600">Enter your email to reset your password</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

