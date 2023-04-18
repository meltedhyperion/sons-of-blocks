import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

function Page() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if(isConnected) router.push("/onboarding");
  })

  return (
    <div className="flex flex-col gap-3 p-16">
      <h1 className="text-7xl font-bold">De-Gilocker</h1>
      <h2 className="text-2xl">Empower your data, at your fingertips</h2>
      <h2 className="text-4xl font-semibold">Connect Your Wallet to Get Started</h2>
    </div>
  )
}

export default Page;
