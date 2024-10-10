export type Data = Array<Record<string, string>>;

export type ApiSearchResponse = {
	data: Data;
};

export type ApiUploadResponse = {
	message: string;
	data: Data;
};
