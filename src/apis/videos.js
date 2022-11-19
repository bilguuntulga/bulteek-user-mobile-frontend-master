import Request from "utils/request";

export const list = (data, options) => Request.get("/api/user_movie/movie", data, options);

export const get = (id) => Request.get(`/api/user_movie/movie/${id}`);
export const banner = (data) => Request.get("/api/user_movie/banner", data);
export const calendar = (data) => Request.get("/api/user_movie/calendar", data);
// export const list_count = (data) => Request.get("/api/movie/list_count", data);
export const view = (data) => Request.post(`/api/user_movie/movie/view`, data);

export const count_view_movie = (data) => Request.post(`/api/user_movie/movie/count_view_movie`, data)

export const like_list = {
  create: (data, options) => Request.post(`/api/user_movie/like_movie/${data.movieId}`, data, options),
  list: (data, options) => Request.get("/api/user_movie/like_movie", data, options),
  remove: (data, options) => Request.del(`/api/user_movie/like_movie/${data.movieId}`, data, options),
}

export const vodAPI = {
  getSubtitle: (id) => Request.get(`/vod/vod_sub/sub_title/${id}`),
};
