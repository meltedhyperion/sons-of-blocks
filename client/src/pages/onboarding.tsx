import { useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { ProtectedRoute, Loader } from "@/components/shared";
import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const initialData = {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Email: "",
  DateOfBirth: "",
  AadhaarNumber: ""
}

function OnboardingPage() {
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
  const [userData, setUserData] = useState(initialData);

  useEffect(() => {
    console.log(data);
    if (!isLoading && data.data !== null) router.push("/me");
  }, [isLoading, data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateData = (updatedData: any) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "MetamaskToken": address!,
    },
    body: JSON.stringify(updatedData)
  }).then(res => res.json().then(() => router.reload()))

  const { mutate } = useMutation({
    mutationFn: updateData
  })

  const submitHandler = () => {
    mutate(userData);
    setUserData(initialData);
  }

  return (
    <ProtectedRoute>
      {isLoading ? <Loader /> : (
        <div className="flex flex-col items-center justify-center min-h-[70vh] mx-auto gap-3 w-1/2 md:w-1/4">
          <Input type="text" name="FirstName" placeholder="First Name" onChange={handleChange} value={userData.FirstName} />
          <Input type="text" name="MiddleName" placeholder="Middle Name" onChange={handleChange} value={userData.MiddleName} />
          <Input type="text" name="LastName" placeholder="Last Name" onChange={handleChange} value={userData.LastName} />
          <Input type="email" name="Email" placeholder="Email" onChange={handleChange} value={userData.Email} />
          <Input type="date" name="DateOfBirth" placeholder="Date of Birth" onChange={handleChange} value={userData.DateOfBirth} />
          <Input type="number" name="AadhaarNumber" placeholder="Aadhaar" onChange={handleChange} value={userData.AadhaarNumber} />
        <Button onClick={submitHandler}>Submit</Button>
      </div>
      )}
    </ProtectedRoute>
  )
}

export default OnboardingPage;
