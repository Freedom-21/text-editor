import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { END_POINT, headers } from "utils/constants";
import { IDocumentProps } from "pages/home/type";

const useMakeCall = () => {
  const [document, setDocument] = useState<IDocumentProps[]>([
    {
      _id: "",
      title: "",
      data: {},
      pinned: false,
      invited_users: [],
      is_deleted: false,
      created_by: "",
      updated_by: "",
      createdAt: "",
      updatedAt: "",
      collaboratorsFullName: ["", ""],
      ownersFullName: [""],
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = (value: number) => {
    setPage(value);
  };

  const fetchDocument = () => {
    axios
      .get(`${END_POINT}/api/v1/documents`, {
        method: "GET",
        params: {
          page: page,
          limit: 6,
          search: search,
        },
        headers,
      })
      .then((res) => {
        setDocument(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const createDocument = (data: object) => {
    axios
      .post(`${END_POINT}/api/v1/documents`, data, {
        method: "POST",
        headers,
      })
      .then((res) => {
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "error", headers, data);
      });
  };

  const updateDocument = (data: object, id: string) => {
    axios
      .patch(`${END_POINT}/api/v1/documents/${id}`, data, {
        method: "PATCH",
        headers,
      })
      .then((res) => {
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const deleteDocument = (id: string) => {
    axios
      .delete(`${END_POINT}/api/v1/documents/${id}`, {
        method: "DELETE",
        headers,
      })
      .then((res) => {
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    fetchDocument();
  }, [page, search, updateDocument, createDocument]);

  return {
    search,
    page,
    document,
    setPage,
    onChange,
    handleClick,
    createDocument,
    fetchDocument,
    updateDocument,
    deleteDocument,
  };
};

export default useMakeCall;
