import { useAccount } from "wagmi";

function Page() {
  const { address } = useAccount();

  return (
    <div>
      {address}
    </div>
  )
}

export default Page;
