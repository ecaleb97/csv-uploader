import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CardWrapperProps {
	children: React.ReactNode;
}

export function CardWrapper({ children }: CardWrapperProps) {
	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					CSV File Uploader and Viewer
				</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
