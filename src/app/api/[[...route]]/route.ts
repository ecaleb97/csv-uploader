import { Hono } from "hono";
import { handle } from "hono/vercel";
import upload from "@/features/upload/server/route";
import users from "@/features/users/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/upload", upload).route("/users", users);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
