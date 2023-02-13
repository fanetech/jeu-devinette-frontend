import BasicUrl from "./ApiConfig";

const add = (payload) => {
  const d = {
    pseudo: payload,
  };
  return BasicUrl.post(`/users`, d);
};

const update = (id, payload) => {
  const d = {
    mark: payload,
  };
  return BasicUrl.put(`/users/${id}`, d);
};

const getAll = () => {
  return BasicUrl.get(`/users`);
};


export const apiService = {
  add,
  update,
  getAll,
};
