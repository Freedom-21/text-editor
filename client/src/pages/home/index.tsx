import Home from "components/Home";
import useMakeCall from "utils/hooks/api/useMakeCall";
import useGetUser from "utils/hooks/api/useGetUser";
import AppBar from "components/Appbar";
import { IHomePageProps } from "./type";

export const HomePage: React.FC<IHomePageProps> = () => {
  const { onChange, document } = useMakeCall();
  const { loggedUser } = useGetUser();

  return (
    <div className="flex flex-col relative">
      <AppBar onChange={onChange} loggedUser={loggedUser} />
      <div className="mt-10">
        <Home document={document} loggedUser={loggedUser} />
      </div>
    </div>
  );
};
