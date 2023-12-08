import { axiosClient } from "./axios-client";

export const query = () => ({
  product: {
    getAll: () => axiosClient.get("/product"),
    getFilter: (filter) =>
      filter === undefined
        ? null
        : axiosClient.get("/product/filter?" + filter),
    getOne: (id) =>
      id === undefined ? null : axiosClient.get("/product/" + id),
    getSearch: (query) =>
      query === undefined ? null : axiosClient.get("/product/search/" + query),
  },
  category: {
    getAll: () => axiosClient.get("/category"),
    getFilter: (filter) =>
      filter === undefined ? null : axiosClient.get("/category" + filter),
    getOne: (id) =>
      id === undefined ? null : axiosClient.get("/category" + id),
  },
  auth: {
    login: (payload) =>
      payload === undefined ? null : axiosClient.post("/auth/login", payload),
    register: (payload) =>
      payload === undefined ? null : axiosClient.post("/register", payload),
  },
  comment: {
    getListByProductId: (productId) =>
      productId === undefined ? null : axiosClient.get("/comment/" + productId),
    add: (payload) =>
      payload === undefined ? null : axiosClient.post("/comment/add", payload),
  },
  store: {
    getAll: () => axiosClient.get("/order/allOrder"), // tuyến đường dữ liệu của giỏ hàng
    detlete: (orderId) => axiosClient.delete(`/order/delete/${orderId}`), //xóa giỏ hàng
    update: (orderId) => axiosClient.update(`/order/update/${orderId}`), //thay đổi thông tin giỏ hàng
  },
  user: {
    update: (userId, data) =>
      axiosClient.put(`/auth/user/${userId}/update`, data),
    info: () => axiosClient.get("/auth/user-info"),
  },
  order: {
    detail: (orderId) => axiosClient.get(`/order/${orderId}`),
    update: (orderId, payload) =>
      axiosClient.put(`/order/update/${orderId}`, payload),
  },
});
