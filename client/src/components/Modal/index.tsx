import { useState } from "react";
import { IModalProps } from "./type";
import Card from "components/blocks/Card";
import InputField from "components/blocks/InputField";
import Button from "components/blocks/Button";
import { CgClose } from "react-icons/cg";
import { HiOutlineDocumentText, HiOutlineUserCircle } from "react-icons/hi";
import Selector from "components/blocks/Selector";
import useGetUser from "utils/hooks/api/useGetUser";
import useMakeCall from "utils/hooks/api/useMakeCall";

const Modal: React.FC<IModalProps> = ({ showModal, toggleModal }) => {
  if (!showModal) return null;

  const { userList, loggedUser } = useGetUser();
  const { createDocument } = useMakeCall();

  const { _id } = loggedUser && loggedUser;
  const users = userList
    ?.filter((user) => user?._id !== _id)
    ?.map((user) => {
      return {
        value: user._id,
        label: `${user?.first_name} ${user?.last_name}`,
      };
    });

  const [title, setTitle] = useState<string>("");
  const [invited_users, setInvited_users] = useState<string[]>();

  const handleSelectChange = (selectedOptions: any) => {
    setInvited_users(selectedOptions?.map((option: any) => option?.value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const data = {
    title,
    invited_users,
  };
  const handleClick = () => {
    createDocument(data);
    toggleModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur"
      onClick={toggleModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Card type="center" className=" bg-white">
          <div className="flex items-center justify-end">
            <div className="text-[#1E56A0] text-[26px] font-semibold">
              Create doc
            </div>
            <Button
              startIcon={<CgClose color="#1E56A0" />}
              className="flex w-[40px] h-[30px] right-[100px] mt-[0px] ml-64 bg-white border-[1px] border-[#1E56A0] hover:bg-gray-200 text-blue"
              onClick={toggleModal}
            />
          </div>
          <InputField
            type="text"
            startIcon={<HiOutlineDocumentText />}
            placeholder="document title"
            onChange={handleChange}
          />
          <Selector
            options={users}
            type="multi"
            onChange={handleSelectChange}
            startIcon={<HiOutlineUserCircle />}
            placeholder="Select collaborator ..."
          />
          <div className="flex gap-8">
            <button
              className="w-[130px] bg-white border-[1px] text-gray-500  border-gray-300 hover:bg-gray-200  h-[40px] rounded-md  mt-8"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <Button label="Save" className="w-[130px]" onClick={handleClick} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
