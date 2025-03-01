import { CheckCircle, Circle } from "lucide-react"

interface ProgressIndicatorProps {
  stage: "post-submission" | "practice-selection"
}

export function ProgressIndicator({ stage }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <CheckCircle className="w-5 h-5 text-green-500" />
      <div className="h-1 w-8 bg-gray-300">
        <div
          className={`h-full bg-blue-500 transition-all duration-300 ease-in-out ${
            stage === "practice-selection" ? "w-full" : "w-0"
          }`}
        />
      </div>
      {stage === "practice-selection" ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <Circle className="w-5 h-5 text-gray-300" />
      )}
    </div>
  )
}

