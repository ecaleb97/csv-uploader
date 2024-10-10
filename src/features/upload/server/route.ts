import { Hono } from "hono";
import csvToJson from "convert-csv-to-json";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export let userData: Array<Record<string, string>> = [];
let json: Array<Record<string, string>> = [];

const app = new Hono().post(
	"/",
	zValidator(
		"form",
		z.object({
			file: z.instanceof(File),
		}),
	),
	async (c) => {
		// const body = await c.req.parseBody();
		const body = c.req.valid("form");
		const file = body["file"] as File | undefined;
		if (file instanceof File) {
			console.log("File", file);
		}
		// const formData = await c.req.formData();
		// const file = formData.get("file") as File;
		// console.log(file);

		console.log("File", file);
		if (!file) {
			return c.json({ message: "File is required" }, 400);
		}

		if (file.type !== "text/csv") {
			return c.json({ message: "File must be a CSV" }, 400);
		}

		const arrayBuffer = await file.arrayBuffer();
		try {
			const rawCsv = Buffer.from(arrayBuffer).toString("utf-8");
			json = csvToJson.fieldDelimiter(",").csvStringToJson(rawCsv);
		} catch {
			return c.json({ message: "Error parsing CSV to JSON" }, 500);
		}

		userData = json;

		return c.json({ message: "File Uploaded", data: json }, 200);
	},
);

export default app;
