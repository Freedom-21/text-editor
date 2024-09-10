import { useState } from "react";
import {
  MdOutlineAdd,
  MdDeleteOutline,
  MdArrowForward,
  MdArrowBack,
} from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import NavBar from "components/Navbar";
import Button from "components/blocks/Button";
import Card from "components/blocks/Card";
import Modal from "components/Modal";
import { IHomeComponentProps } from "./type";
import useDateFormatter from "utils/hooks/useDateFormatter";
import { NavLink } from "react-router-dom";
import { IDocumentProps } from "pages/home/type";
import useMakeCall from "utils/hooks/api/useMakeCall";
import DeleteModal from "components/Modal/delete";

const Home: React.FC<IHomeComponentProps> = ({ document, loggedUser }) => {
  const formatDate = useDateFormatter();
  const [value, setValue] = useState<IDocumentProps[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [docId, setDocId] = useState<string>("");
  const { first_name, last_name } = loggedUser || {};
  

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const { updateDocument, page, setPage } = useMakeCall();

  const handleClick = (doc: IDocumentProps) => {
    updateDocument({ ...doc, pinned: !doc?.pinned }, doc?._id);
  };

  const data = value?.length === 0 ? document : value;

  const handlePageIncrement = () => {
    setPage(page + 1);
  };
  const handlePageDecrement = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <NavBar
          setValue={setValue}
          pinned={document?.filter((doc) => doc?.pinned !== false)}
          invited={document?.filter((doc) =>
            doc?.collaboratorsFullName?.includes(`${first_name} ${last_name}`)
          )}
          recent={document}
        />
        <Button
          label="New doc"
          startIcon={<MdOutlineAdd />}
          className="w-[130px] "
          onClick={toggleModal}
        />
      </div>
      {data?.length ? (
        <div className="grid  grid-flow-row  md:items-center md:grid-cols-1 md:m-auto  lg:grid-cols-2  xl:grid-cols-3 mt-12 gap-10">
          {data?.map((doc) => (
            <div key={doc?._id}>
              <Card
                type="flex"
                className="flex flex-col w-[380px] rounded-2xl  h-52  col-span-1 shadow-md"
              >
                <div className="flex justify-end">
                  <div
                    className=" absolute p-[4px] rounded-full text-[20px] text-gray-400 hover:bg-slate-400 hover:text-white transition-colors duration-300"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClick(doc);
                    }}
                  >
                    {doc?.pinned ? <BsPinAngleFill /> : <BsPinAngle />}
                  </div>
                </div>
                <div className="relative flex items-center justify-center text-stone-600">
                  <h3
                    className="text-[20px] font-medium cursor:auto"
                    id="title"
                  >
                    {doc?.title?.length > 30
                      ? doc?.title?.slice(0, 30) + "..."
                      : doc?.title}
                  </h3>
                </div>
                <div className="relative flex justify-center gap-1 text-[14px] text-stone-600">
                  <span>Collaborate with</span>
                  {doc?.collaboratorsFullName?.length ? (
                    <>
                      <span className="hover:underline">
                        {doc?.collaboratorsFullName[0]}
                      </span>
                      {doc?.collaboratorsFullName?.length - 1 !== 0 ? (
                        <span
                          className="text-[#1e56a0e2] hover:underline cursor-default"
                          id="other-users"
                        >
                          {doc?.collaboratorsFullName?.length - 1} others
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <span className="hover:underline text-[#1e56a0e2] cursor-auto">
                      no one yet
                    </span>
                  )}
                </div>

                <div className="text-[#dad6d6] text-[14px] pt-[50px] flex justify-around items-center">
                  <span>Last update on {formatDate(doc?.updatedAt)}</span>
                  <div className="flex justify-center ml-[50px] gap-4">
                    <NavLink to={doc?._id}>
                      <div className="bg-[#1E56A0] flex justify-center items-center  rounded-full w-[30px] h-[30px] ">
                        <BiEditAlt fontSize="20px" />
                      </div>
                    </NavLink>
                    <div
                      className="bg-[#E91E63] flex justify-center items-center cursor-pointer  rounded-full w-[30px] h-[30px] "
                      onClick={() => {
                        toggleDeleteModal();
                        setDocId(doc?._id);
                      }}
                    >
                      <MdDeleteOutline fontSize="20px" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex  flex-col justify-center items-center  ">
          <span className="absolute top-[440px]">Noting to show here</span>
        </div>
      )}
      <div className="mt-28">
        <div className=" flex gap-4 justify-end absolute bottom-12 md:right-10 lg:right-0">
          {page > 1 && (
            <Button
              startIcon={<MdArrowBack fontSize="22px" />}
              className="w-[40px] "
              onClick={handlePageDecrement}
            />
          )}
          {document &&document?.length !== 0 && (
            <Button
              startIcon={<MdArrowForward fontSize="22px" />}
              className="w-[40px] "
              onClick={handlePageIncrement}
            />
          )}
        </div>
      </div>
      {showModal && <Modal showModal={showModal} toggleModal={toggleModal} />}
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          toggleDeleteModal={toggleDeleteModal}
          id={docId}
        />
      )}
    </div>
  );
};

export default Home;
