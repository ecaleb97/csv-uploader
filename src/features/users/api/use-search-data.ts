// import type { ApiSearchResponse, Data } from "@/types";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { ApiSearchResponse } from "@/types/types";

export function useSearchData(search?: string) {
	const query = useQuery({
		enabled: !!search,
		queryKey: ["searchData", search],
		queryFn: async () => {
			// const response = await fetch(
			// 	`${process.env.NEXT_PUBLIC_APP_URL!}/api/users?q=${search}`,
			// );
			const response = await client.api.users["$get"]({
				query: { query: search },
			});

			if (!response.ok) {
				throw new Error(`Error searching data: ${response.statusText}`);
			}

			const { data } = (await response.json()) as ApiSearchResponse;

			return data;
		},
	});

	return query;
}
