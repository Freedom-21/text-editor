export const END_POINT = import.meta.env.VITE_END_POINT;
export const headers = {
  accept: "Application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};
