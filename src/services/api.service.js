import BasicUrl from "./ApiConfig";

const add = (payload) => {
  const d = {
    pseudo: payload,
  };
  return BasicUrl.post(`/users`, d);
};

export const apiService = {
  add,
};
