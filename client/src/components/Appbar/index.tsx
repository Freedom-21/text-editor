import InputField from "components/blocks/InputField";
import { IAppBar } from "./type";

const AppBar: React.FC<IAppBar> = ({ onChange, loggedUser }) => {
  const { first_name, last_name } = loggedUser || {};

  return (
    <div className="flex justify-between items-center mt-2 mx-6">
      <h1 className="text-[#1E56A0] text-[32px] font-semibold">Editor</h1>
      <div className="flex flex-row items-center gap-7">
        <InputField
          onChange={onChange}
          type="text"
          placeholder="Search docs..."
        />
        <div className="cursor-default w-12 h-12 rounded-full bg-gray-400 text-white text-xl font-semibold flex justify-center items-center">
          {first_name&&first_name?.charAt(0) + last_name&&last_name?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
