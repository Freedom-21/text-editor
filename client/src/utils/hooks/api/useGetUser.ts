import { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT, headers } from "utils/constants";
import { IUser } from "pages/home/type";

const useGetUsers = () => {
  const [loggedUser, setLoggedUser] = useState<IUser>({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_deleted: false,
    createdAt: "",
    updatedAt: "",
  });
  const [userList, setUserList] = useState<IUser[]>([
    {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      is_deleted: false,
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const fetchLoggedUser = () => {
    axios
      .get(`${END_POINT}/api/v1/users/logged_user`, {
        method: "GET",

        headers,
      })
      .then((res) => {
        setLoggedUser(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const fetchUsers = () => {
    axios
      .get(`${END_POINT}/api/v1/users`, {
        method: "GET",

        headers,
      })
      .then((res) => {
        setUserList(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    fetchLoggedUser();
    fetchUsers();
  }, []);

  return {
    loggedUser,
    userList,
  };
};

export default useGetUsers;
