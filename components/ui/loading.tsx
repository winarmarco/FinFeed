import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingProps {
  className?: string
}

export const LoadingSpinner: React.FC<LoadingProps> = ({className}) => {
  return <div className={cn("w-full h-full flex items-center justify-center", className)}>
    <Loader2 className="animate-spin"/>
  </div>
}