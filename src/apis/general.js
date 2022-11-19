import request from "utils/request";

export const init = () => request.get("/api/general_init");
export const fileView = (data) => request.post("/api/file_view", data);

export const categories = () => request.get("/api/public_movie/category");

export const public_movie = () => request.get("/api/public_movie/movie");
