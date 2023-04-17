import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui";

interface AadharProps {
	name: string;
	aadharNumber: string;
}

const Aadhar = ({ name, aadharNumber }: AadharProps) => {
  return (
		<Card className="w-80 h-52">
			<CardHeader>
				<CardTitle>Aadhar Card</CardTitle>
				<div className="py-3">
					<div className="text-2xl font-bold">{aadharNumber}</div>
					<div className="">{name}</div>
				</div>
				<Button className="w-fit self-end">Edit</Button>
			</CardHeader>
		</Card>
	)
}

export default Aadhar;
