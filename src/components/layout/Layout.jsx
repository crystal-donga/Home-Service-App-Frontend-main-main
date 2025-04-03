
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};


export default Layout;
