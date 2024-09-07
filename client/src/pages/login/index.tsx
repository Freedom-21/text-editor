import React, { useState } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUnlock } from "react-icons/fi";
import InputField from "components/blocks/InputField";
import Button from "components/blocks/Button";
import Card from "components/blocks/Card";
import { Link } from "react-router-dom";
import { END_POINT } from "utils/constants";

const index: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState<{
    email: string;
    password: string;
  }>(defaultFormFields);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const { email, password } = formFields;

  const handleSubmit = () => {
    const data = { email, password };

    axios
      .post(`${END_POINT}/api/v1/users/login`, data)
      .then((response) => {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        window.location.replace("/");
        console.log(response, "thi is response");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        console.log(
          err?.response?.data?.message?.message,
          "error from backend",
          err
        );
      });
  };

  return (
    <Card type="center">
      <h1 className="text-[#1E56A0] text-[32px] font-semibold">Editor</h1>
      <div className="flex flex-col gap-4 md:w-[340px] pt-2 ">
        {error && (
          <span className="text-center text-[12px] text-red-600">{error}</span>
        )}
        <InputField
          type="email"
          startIcon={<MdOutlineEmail />}
          placeholder="johndoe@example.com"
          name="email"
          onChange={handleChange}
        />

        <InputField
          type={!showPassword ? "password" : "text"}
          startIcon={<FiUnlock />}
          placeholder="password"
          onClick={() => setShowPassword(!showPassword)}
          endIcon={
            showPassword ? (
              <AiOutlineEye className="text-gray-400" />
            ) : (
              <AiOutlineEyeInvisible className="text-gray-400" />
            )
          }
          name="password"
          onChange={handleChange}
        />
        <Button label="Signin" onClick={handleSubmit} />
        <div className="flex justify-end">
          <span className="text-sm ">
            Don’t have an account{" "}
            <Link to="/signup">
              <span className="text-[#2174C9] cursor-default hover:underline">
                sign-up
              </span>
            </Link>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default index;
