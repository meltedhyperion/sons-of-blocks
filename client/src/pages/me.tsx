import { Aadhaar, PANCard } from "@/components/cards";
import { Loader, ProtectedRoute } from "@/components/shared";
import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Dialog } from "@/components/ui/Dialog";

function Me() {
  const { address } = useAccount();
  const router = useRouter();
  
  const { isLoading, data } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/all`, {
      headers: {
        "MetamaskToken": address!
      }
    }).then(res => res.json())
  })

  const updateData = (updatedData: any) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "MetamaskToken": address!,
    },
    body: JSON.stringify(updatedData)
  }).then(res => res.json().then(() => router.reload()))

  const { mutate } = useMutation({
    mutationFn: updateData
  })

  if (isLoading) return <Loader />

  const { FirstName, MiddleName, LastName, AadhaarNumber, PANCardNo, lastChanged } = data.data;

  return (
    <ProtectedRoute>
      <div className="flex gap-5 items-center justify-center">
        {AadhaarNumber && <Aadhaar name={`${FirstName} ${MiddleName} ${LastName}`} aadhaarNumber={AadhaarNumber} mutate={mutate} isVerified={!lastChanged.includes("Aadhaar")} />}
        {PANCardNo && <PANCard name={`${FirstName} ${MiddleName} ${LastName}`} pan={PANCardNo} mutate={mutate} isVerified={!lastChanged.includes("PANCard")} />}
        <Dialog>

        </Dialog>
      </div>
    </ProtectedRoute>
  );
}

export default Me;
