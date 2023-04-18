import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) router.push("/");
    setIsLoading(false);
  })

  return (
    isLoading 
    ? (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
      </div>
    ) : (
      <>
        {children}
      </>
    )
  )
}

export default ProtectedRoute;
