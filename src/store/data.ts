import { create } from "zustand";
import { Data } from "@/types/types";

export const APP_STATUS = {
	IDLE: "idle",
	ERROR: "error",
	READY_UPLOAD: "ready_upload",
	UPLOADING: "uploading",
	READY_USAGE: "ready_usage",
} as const;

type AppStatus = (typeof APP_STATUS)[keyof typeof APP_STATUS];

interface DataState {
	data: Data;
	setData: (data: Data) => void;
}

interface StatusState {
	status: AppStatus;
	setStatus: (status: AppStatus) => void;
}

export const defaultInitialData: Data = [];

export const useDataStore = create<DataState>((set) => ({
	data: defaultInitialData,
	setData: (data) => set({ data: data }),
}));

export const useStatusStore = create<StatusState>((set) => ({
	status: APP_STATUS.IDLE,
	setStatus: (status) => set({ status: status }),
}));
