import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button, Input, Label } from "@/components/ui";
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/Dialog";

interface AadharProps {
	name: string;
	aadhaarNumber: string;
	isVerified: boolean;
	mutate: ({}) => void;
}

const initialData = {
	FirstName: "",
	MiddleName: "",
	LastName: "",
	PhoneNumber: "",
	AadhaarNumber: "",
}

const Aadhar = ({ name, aadhaarNumber, mutate }: AadharProps) => {
	const [userData, setUserData] = useState(initialData);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		mutate(userData);
		setUserData(initialData);
	}

  return (
		<Card className="w-80 h-52 bg-green-200 text-black">
			<CardHeader>
				<CardTitle>Aadhaar Card</CardTitle>
				<div className="py-3">
					<div className="text-2xl font-bold">{aadhaarNumber}</div>
					<div className="">{name}</div>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-fit self-end">Edit</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] bg-green-200 text-black">
						<DialogHeader>
							<DialogTitle>Edit Aadhar</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									First Name
								</Label>
								<Input value={userData.FirstName} name="FirstName" onChange={handleInputChange} className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Middle Name
								</Label>
								<Input value={userData.MiddleName} name="MiddleName" onChange={handleInputChange} className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Last Name
								</Label>
								<Input value={userData.LastName} name="LastName" onChange={handleInputChange} className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Phone Number
								</Label>
								<Input value={userData.PhoneNumber} name="PhoneNumber" onChange={handleInputChange} className="col-span-3" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Aadhaar Number
								</Label>
								<Input value={userData.AadhaarNumber} name="AadhaarNumber" onChange={handleInputChange} className="col-span-3" />
							</div>
						</div>
						<DialogFooter>
							<Button onClick={handleSubmit}>Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardHeader>
		</Card>
	)
}

export default Aadhar;
