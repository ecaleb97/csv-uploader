import {
	Table,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableBody,
} from "@/components/ui/table";
import { Data } from "@/types/types";

interface TableDataProps {
	data: Data;
}

export function TableData({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Object.keys(data[0]).map((key, index) => (
						<TableHead key={index} className="font-bold">
							{key}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, index) => (
					<TableRow key={index}>
						{Object.values(row).map((value, index) => (
							<TableCell key={index}>{value}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
