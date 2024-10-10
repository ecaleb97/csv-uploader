import { useMutation } from "@tanstack/react-query";
import type { ApiUploadResponse } from "@/types/types";

export function useUploadFile() {
	const mutation = useMutation<ApiUploadResponse, Error, File>({
		mutationFn: async (file: File) => {
			const formData = new FormData();
			formData.append("file", file);
			// const response = await client.api.upload["$post"]({
			// 	form: { file },
			// });
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL!}/api/upload`,
				{
					method: "POST",
					body: formData,
				},
			);

			const data = await response.json();
			return data;
		},
		onError: () => {
			console.log("Error");
		},
	});

	return mutation;
}
