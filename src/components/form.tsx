"use client";

import { useUploadFile } from "@/features/upload/api/use-upload-file";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStatusStore, useDataStore } from "@/store/data";
import { APP_STATUS } from "@/store/data";
import { toast } from "sonner";
import { CardWrapper } from "./card-wrapper";
import { Upload } from "lucide-react";
import { SearchUsers } from "./search";

type Inputs = {
	file: File;
};

export function UploadForm() {
	const { status, setStatus } = useStatusStore((state) => state);
	const { data, setData } = useDataStore((state) => state);
	const form = useForm<Inputs>();
	const { mutate } = useUploadFile();

	const onSubmit = ({ file }: Inputs) => {
		mutate(file, {
			onSuccess: (data) => {
				if (data) {
					setData(data.data);
				}
				setStatus(APP_STATUS.READY_USAGE);
				toast.success("File uploaded successfully");
			},
			onError: () => {
				setStatus(APP_STATUS.ERROR);
				toast.error("Error uploading file");
			},
		});
	};

	return (
		<CardWrapper>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						name="file"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="file"
										accept=".csv"
										onChange={(e) => {
											const [file] = e.target.files ?? [];
											field.onChange(file);
											setStatus(APP_STATUS.READY_UPLOAD);
										}}
										onBlur={field.onBlur}
										name={field.name}
										ref={field.ref}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{status === APP_STATUS.READY_UPLOAD && (
						<Button type="submit" variant="default">
							<Upload className="mr-2 size-4" />
							Upload file
						</Button>
					)}
				</form>
			</Form>
			{status === APP_STATUS.READY_USAGE && <SearchUsers initialData={data} />}
		</CardWrapper>
	);
}
