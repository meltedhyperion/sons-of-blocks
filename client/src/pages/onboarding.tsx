import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react"
import { useAccount } from "wagmi";
import { Input, Button } from "@/components/ui";

const initialData = {
  name: "",
  dob: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  pan: "",
  aadhar: ""
}

function OnboardingPage() {
  const [userData, setUserData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) router.push("/");
		setIsLoading(false);
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    console.log(userData);
    setUserData(initialData);
  }

  return (
    isLoading 
    ? (
			<div className="flex items-center justify-center min-h-[70vh]">
				<Loader2 className="mr-2 h-10 w-10 animate-spin" />
			</div>
		) : (
			<div className="flex flex-col justify-center min-h-[70vh] mx-auto gap-3 w-1/2 md:w-1/4">
				<Input type="email" name="email" placeholder="Email" onChange={handleChange} value={userData.name} />
				<Input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} value={userData.dob} />
				<Input type="tel" name="phone" placeholder="Phone" onChange={handleChange} value={userData.phone} />
				<Input type="text" name="pan" placeholder="Pan" onChange={handleChange} value={userData.pan} />
				<Input type="number" name="aadhar" placeholder="Aadhar" onChange={handleChange} value={userData.aadhar} />
				<div className="flex gap-3">
						<Input type="text" name="state" placeholder="State" onChange={handleChange} value={userData.state} />
						<Input type="number" name="pincode" placeholder="Pincode" onChange={handleChange} value={userData.pincode} />
				</div>
				<Button onClick={submitHandler}>Submit</Button>
			</div>
    )
  )
}

export default OnboardingPage;
