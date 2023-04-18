import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";

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

const handleVerify = async (metamaskId: string) => {
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
