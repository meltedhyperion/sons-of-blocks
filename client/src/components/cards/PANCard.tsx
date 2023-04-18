import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge, Button, Input, Label } from "@/components/ui";
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { VerifiedIcon } from "lucide-react"
import { ethers } from "ethers";

interface PANCardProps {
	name: string;
	pan: string;
	isVerified: boolean;
	mutate: ({}) => void;
}


const CONTRACT_ADDRESS = "0x9d9F6c20e13c55da38f09d0Eba2D8d53D58c7DD8"
const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "updateData",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "verifyData",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "government",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const initialData = {
	FirstName: "",
	MiddleName: "",
	LastName: "",
	PhoneNumber: "",
	PANCardNo: "",
}

const PANCard = ({ name, pan, isVerified, mutate }: PANCardProps) => {
	const [userData, setUserData] = useState(initialData);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};


	const callingSmartContract = async () => {
		try {
		  console.log("Begin"); 
		  const { ethereum } = window;
	  
		  if (ethereum) {
	  
			// @ts-ignore
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
	  
			console.log("Connected", accounts[0]); 
	
			let attack = await connectedContract.updateData("0xF16a2579231e2ceAb8e533008c3d1c61fb263562");
			console.log("Process started");
			await attack.wait();
			console.log("Process fininshed");
	
		  } 
		  else {
			console.log("Ethereum object doesn't exist!");
		  }
		} catch (error) {
		  console.log(error)
		}
	}

	const handleSubmit = async () => {
		await callingSmartContract();
		mutate(userData);
		setUserData(initialData);
	}

  return (
		<Card className="w-80 h-52 bg-blue-300 text-black">
			<CardHeader>
				<CardTitle className="flex justify-between">PAN Card {isVerified && <Badge className="flex gap-2 bg-white">Verified<VerifiedIcon className="w-4 h-4"/></Badge>}</CardTitle>
				<div className="py-3">
					<div className="text-2xl font-bold">{pan}</div>
					<div className="">{name}</div>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-fit self-end">Edit</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] bg-blue-300 text-black">
						<DialogHeader>
							<DialogTitle>Edit PAN</DialogTitle>
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
									PAN
								</Label>
								<Input value={userData.PANCardNo} name="PANCardNo" onChange={handleInputChange} className="col-span-3" />
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

export default PANCard;
