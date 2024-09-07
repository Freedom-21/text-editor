import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUnlock } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import InputField from "components/blocks/InputField";
import Button from "components/blocks/Button";
import { Link } from "react-router-dom";
import Card from "components/blocks/Card";
import axios from "axios";
import { END_POINT } from "utils/constants";

const index: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<
    {
      location: string;
      msg: string;
      path: string;
      type: string;
      value: string;
    }[]
  >([
    {
      location: "",
      msg: "",
      path: "",
      type: "",
      value: "",
    },
  ]);

  const defaultFormFields = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formFields, setFormFields] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  }>(defaultFormFields);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const { first_name, last_name, email, password, confirm_password } =
    formFields;

  const handleSubmit = () => {
    const data = { first_name, last_name, email, password };
    first_name && last_name !== "" ? (
      axios
        .post(`${END_POINT}/api/v1/users/signup`, data)
        .then((response) => {
          window.location.replace("/login");
          console.log(response, "thi is response");
        })
        .catch((err) => {
          setError(err?.response?.data?.errors);
          console.log(err, "error from backend");
        })
    ) : (
      <></>
    );
  };

  const emailError = error?.filter((err) => err?.path === "email")[0]?.msg;
  const passwordError = error?.filter((err) => err?.path === "password")[0]
    ?.msg;

  console.log(
    formFields,
    emailError,
    error?.filter((err) => err?.path),
    "error from backend"
  );

  return (
    <Card type="center">
      <h1 className="text-[#1E56A0] text-[32px] font-semibold">Editor</h1>
      <div className="flex flex-col gap-4 md:w-[340px] pt-2 relative">
        <InputField
          type="text"
          startIcon={<AiOutlineUser />}
          placeholder="John"
          name="first_name"
          onChange={handleChange}
        />
        {!first_name && (
          <span className=" text-left text-[11px] text-red-600 ">
            {`First name is required`}
          </span>
        )}
        <InputField
          type="text"
          startIcon={<AiOutlineUser />}
          placeholder="Doe"
          name="last_name"
          onChange={handleChange}
        />
        {!last_name && (
          <span className="text-left text-[11px] text-red-600">
            {`Lastt name is required`}
          </span>
        )}
        <InputField
          type="email"
          startIcon={<MdOutlineEmail />}
          placeholder="johndoe@example.com"
          name="email"
          onChange={handleChange}
        />{" "}
        {error && (
          <span className="text-left text-[11px] text-red-600">
            {emailError}
          </span>
        )}
        <InputField
          type={showPassword ? "text" : "password"}
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
        <InputField
          type={showPassword ? "text" : "password"}
          startIcon={<FiUnlock />}
          placeholder="confirm  password"
          onClick={() => setShowPassword(!showPassword)}
          endIcon={
            showPassword ? (
              <AiOutlineEye className="text-gray-400" />
            ) : (
              <AiOutlineEyeInvisible className="text-gray-400" />
            )
          }
          name="confirm_password"
          onChange={handleChange}
        />
        {error && (
          <span className="text-left text-[11px] text-red-600">
            {passwordError}
          </span>
        )}
        <Button
          label="Signup"
          disabled={password !== confirm_password}
          onClick={handleSubmit}
        />
        <div className="flex justify-end">
          <span className="text-sm ">
            Already have an account{" "}
            <Link to="/login">
              <span className="text-[#2174C9] cursor-default hover:underline">
                sign-in
              </span>
            </Link>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default index;
