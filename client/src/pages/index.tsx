import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

function Page() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if(isConnected) router.push("/me");
  })

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Page;
