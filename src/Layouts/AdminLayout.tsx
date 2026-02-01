import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-(--color-PrimeGray)">
      <Sidebar />
      <main className="flex-1 p-6 pt-16 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
