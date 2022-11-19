import request from 'utils/request';

export const list = () => request.get("/api/plan");   