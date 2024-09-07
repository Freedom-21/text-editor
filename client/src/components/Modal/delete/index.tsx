import { useState } from "react";
import { IDeleteModalProps } from "../type";
import Card from "components/blocks/Card";
import Button from "components/blocks/Button";
import { CgClose } from "react-icons/cg";
import useMakeCall from "utils/hooks/api/useMakeCall";

const DeleteModal: React.FC<IDeleteModalProps> = ({
  showModal,
  toggleDeleteModal,
  id,
}) => {
  if (!showModal) return null;

  const { deleteDocument } = useMakeCall();
  const handleClick = () => {
    deleteDocument(id);
    toggleDeleteModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur"
      onClick={toggleDeleteModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Card type="center" className=" bg-white">
          <div className="flex justify-end">
            <Button
              startIcon={<CgClose color="#1E56A0" />}
              className="flex w-[30px] h-[25px]  ml-96 mt-[0px]   bg-white border-[1px] border-[#1E56A0] hover:bg-gray-200 text-blue"
              onClick={toggleDeleteModal}
            />
          </div>
          <div className="text-gray-300 text-[18px] font-semibold">
            Are you sure to delete ?
          </div>
          <div className="flex gap-8">
            <button
              className="w-[130px] bg-white border-[1px] text-gray-500  border-gray-300 hover:bg-gray-200  h-[40px] rounded-md  mt-8"
              onClick={toggleDeleteModal}
            >
              Cancel
            </button>
            <Button
              label="Delete"
              className="w-[130px] bg-[#E91E63]  hover:bg-[#e91e63aa]"
              onClick={handleClick}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeleteModal;
