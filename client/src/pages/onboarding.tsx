import { useState } from "react";
import { Input, Button } from "@/components/ui";
import { ProtectedRoute } from "@/components/shared";

const initialData = {
  name: "",
  email: "",
  dob: "",
  aadhar: ""
}

function OnboardingPage() {
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
        <Input type="text" name="name" placeholder="Name" onChange={handleChange} value={userData.name} />
				<Input type="email" name="email" placeholder="Email" onChange={handleChange} value={userData.email} />
				<Input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} value={userData.dob} />
				<Input type="number" name="aadhar" placeholder="Aadhar" onChange={handleChange} value={userData.aadhar} />
				<Button onClick={submitHandler}>Submit</Button>
			</div>
    </ProtectedRoute>
  )
}

export default OnboardingPage;
