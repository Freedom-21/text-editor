import AppBar from "components/Appbar";
import { ILayoutProps } from "./type";

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  return (
    <div className="flex flex-col">
      {!token ? (
        <div>{children}</div>
      ) : (
        <>
          <div className="m-24 mt-4">{children}</div>
        </>
      )}
    </div>
  );
};

export default Layout;
