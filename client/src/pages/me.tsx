import { Aadhaar, PANCard } from "@/components/cards";
import { Loader, ProtectedRoute } from "@/components/shared";
import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

function Me() {
  const { address } = useAccount();
  
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
  }).then(res => res.json())

  const { mutate } = useMutation({
    mutationFn: updateData
  })

  useEffect(() => {
    
  })

  if (isLoading) return <Loader />

  const { FirstName, MiddleName, LastName, AadhaarNumber, PANCardNo } = data.data;

  return (
    <ProtectedRoute>
      <div className="flex gap-5 items-center justify-center">
        <Aadhaar name={`${FirstName} ${MiddleName} ${LastName}`} aadhaarNumber={AadhaarNumber} mutate={mutate} />
        <PANCard name={`${FirstName} ${MiddleName} ${LastName}`} pan={PANCardNo} mutate={mutate} />
      </div>
    </ProtectedRoute>
  );
}

export default Me;
