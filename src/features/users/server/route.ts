import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { userData } from "@/features/upload/server/route";

const schema = z.object({
	query: z.string().optional(),
});

const app = new Hono().get("/", zValidator("query", schema), (c) => {
	const { query } = c.req.valid("query");

	if (!query) {
		return c.json({ message: "Query is required" }, 400);
	}

	if (Array.isArray(query)) {
		return c.json({ message: "Query must be a string" }, 400);
	}

	const search = query.toLowerCase().toString();

	const filteredData = userData.filter((row) => {
		return Object.values(row).some((value) =>
			value.toLowerCase().includes(search),
		);
	});

	return c.json({ data: filteredData });
});

export default app;
