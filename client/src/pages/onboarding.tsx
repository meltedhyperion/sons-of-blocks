import { useState } from "react";
import { Input, Button } from "@/components/ui";
import { ProtectedRoute, Loader } from "@/components/shared";
import { useAccount } from "wagmi";

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
  const [userData, setUserData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    console.log(userData);
    setUserData(initialData);
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-[70vh] mx-auto gap-3 w-1/2 md:w-1/4">
        <Input type="text" name="first name" placeholder="Name" onChange={handleChange} value={userData.FirstName} />
        <Input type="text" name="middle name" placeholder="Name" onChange={handleChange} value={userData.MiddleName} />
        <Input type="text" name="last name" placeholder="Name" onChange={handleChange} value={userData.LastName} />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} value={userData.Email} />
        <Input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} value={userData.DateOfBirth} />
        <Input type="number" name="aadhar" placeholder="PAN" onChange={handleChange} value={userData.AadhaarNumber} />
        <Button onClick={submitHandler}>Submit</Button>
      </div>
    </ProtectedRoute>
  )
}

export default OnboardingPage;
