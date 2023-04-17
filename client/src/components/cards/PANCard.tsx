import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui";

interface PANCardProps {
	name: string;
	pan: string;
}

const PANCard = ({ name, pan }: PANCardProps) => {
  return (
		<Card className="w-80 h-52">
			<CardHeader>
				<CardTitle>PAN Card</CardTitle>
				<div className="py-3">
					<div className="text-2xl font-bold">{pan}</div>
					<div className="">{name}</div>
				</div>
				<Button className="w-fit self-end">Edit</Button>
			</CardHeader>
		</Card>
	)
}

export default PANCard;
