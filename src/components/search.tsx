"use client";

import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Data } from "@/types/types";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchData } from "@/features/users/api/use-search-data";
import { Search } from "lucide-react";
import { TableData } from "./table-wrapper";

type Inputs = {
	search: string;
};

export function SearchUsers({ initialData }: { initialData: Data }) {
	const [data, setData] = useState<Data>(initialData);
	const [search, setSearch] = useState<string>("");
	const form = useForm<Inputs>({
		defaultValues: {
			search: "",
		},
	});
	const debouncedSearch = useDebounce(search, 500);
	const { data: usersData, isLoading } = useSearchData(debouncedSearch);

	useEffect(() => {
		const newPathname =
			debouncedSearch === ""
				? window.location.pathname
				: `?q=${debouncedSearch}`;

		window.history.pushState({}, "", newPathname);
	}, [debouncedSearch]);

	useEffect(() => {
		if (!debouncedSearch) {
			setData(initialData);
			return;
		}

		if (usersData) {
			setData(usersData);
		}
	}, [initialData, debouncedSearch, setData, usersData]);

	return (
		<div className="my-4">
			<Form {...form}>
				<form>
					<FormField
						name="search"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="relative">
										<Search className="absolute left-2 top-3 size-4 text-muted-foreground" />
										<Input
											{...field}
											placeholder="Search CSV content..."
											onChange={(e) => {
												field.onChange(e.target.value);
												setSearch(e.target.value);
											}}
											className="pl-8"
										/>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			{data.length === 0 && !isLoading && (
				<p className="text-center text-muted-foreground mt-4">
					No results found for your search query
				</p>
			)}
			{isLoading && (
				<p className="mt-4 text-center text-muted-foreground">Loading...</p>
			)}
			{data.length > 0 && (
				<div className="overflow-x-auto mt-4">
					<TableData data={data} />
				</div>
			)}
		</div>
	);
}
