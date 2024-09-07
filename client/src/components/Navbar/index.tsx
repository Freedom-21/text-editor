import { useState } from "react";
import { INavbarProps } from "./type";
import { IDocumentProps } from "pages/home/type";

const NavBar: React.FC<INavbarProps> = ({
  setValue,
  pinned,
  invited,
  recent,
}) => {
  const navLists = [
    {
      id: 1,
      name: "Recent",
      data: recent,
    },
    {
      id: 2,
      name: "Pinned",
      data: pinned,
    },
    {
      id: 3,
      name: "Invited",
      data: invited,
    },
  ];

  const [active, setActive] = useState<number>(1);

  const handleClick = (id: number, data: IDocumentProps[]) => {
    setValue(data);
    setActive(id);
  };

  return (
    <div className="flex gap-7 text-gray-400 cursor-pointer">
      {navLists?.map((link) => (
        <button
          key={link?.id}
          onClick={() => handleClick(link?.id, link?.data)}
          className={`${
            active === link?.id ? "border-b-2 border-[#1E56cf]" : ""
          }`}
        >
          {link?.name}
        </button>
      ))}
    </div>
  );
};

export default NavBar;
