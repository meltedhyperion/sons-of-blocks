import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";
import { ethers } from "ethers";

export interface User {
	MetamaskID?: string,
	FirstName?: string,
	MiddleName?: string,
	LastName?: string,
	DateOfBirth?:number[],
	BloodGroup?:string,
	AadhaarNumber?: string,
	PANCardNo?: string,
	DriversLicenseNumber?: string,
	FathersName?: string,
	MothersName?: string,
	Gender?: string,
	ProfileImage?: string,
	PhoneNumber?: string,
	Email?: string,
	Signature?: string,
	LastChanged?:string[],
	Verified?: boolean,
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

		let attack = await connectedContract.verifyData(process.env.NEXT_PUBLIC_GOVERNMENT_ADDRESS);
		console.log("Process started");
		await attack.wait();
		console.log("Process fininshed");
		console.log(attack);
	  } 
	  else {
		console.log("Ethereum object doesn't exist!");
	  }
	} catch (error) {
	  console.log(error)
	}
  
}

const handleVerify = async (metamaskId: string) => {
	await callingSmartContract();
	await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
		headers: {
			MetamaskToken: metamaskId,
			Authorization: "government"
		}
	})
}

const Admin = ({ updatedUserData }: { updatedUserData: User[] }) => {
  return (
		<div className="flex flex-col gap-4 items-center">
			{updatedUserData.map((user, idx) => <UserData key={idx} {...user}/>)}
		</div>
	)
}

const UserData = ({ FirstName, MiddleName, LastName, AadhaarNumber, BloodGroup, PANCardNo, DriversLicenseNumber, FathersName, MothersName, MetamaskID }: User) => {
	const [isDisabled, setIsDisabled] = useState(false);

	return (
		<Card className="w-96 bg-white text-black">
			<CardHeader>
				<CardTitle className="font-bold">{FirstName} {MiddleName} {LastName}</CardTitle>
				<div>{BloodGroup && `Blood Group: ${BloodGroup}`}</div>
				<div>{AadhaarNumber && `Aadhaar Number: ${AadhaarNumber}`}</div>
				<div>{PANCardNo && `PAN: ${PANCardNo}`}</div>
				<div>{DriversLicenseNumber && `Drivers License: ${DriversLicenseNumber}`}</div>
				<div>{FathersName && `Father's Name: ${DriversLicenseNumber}`}</div>
				<div>{MothersName && `Mother's Name: ${MothersName}`}</div>
				<button disabled={isDisabled} className="bg-green-400 disabled:bg-green-100 disabled:cursor-not-allowed text-black w-fit px-5 py-2 rounded-lg font-medium text-lg self-end" onClick={(e) => {
					handleVerify(MetamaskID!)
					setIsDisabled(true);
				}}>{isDisabled ? "Verified" : "Verify"}</button>
			</CardHeader>
		</Card>
	)
}

export const getServerSideProps = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-all`, {
		headers: {
			Authorization: `${process.env.ACCESS_TOKEN}`
		}
	})

	const { data: updatedUserData } = await res.json()

	return {
		props: {
			updatedUserData
		}
	}
}

export default Admin;
