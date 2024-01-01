import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DrawerBar } from "../components/Drawer";
import { FaBars } from "react-icons/fa";

export default function Root() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <main className="">
      <div className="hidden lg:block fixed top-0 left-0 w-72">
        <Sidebar />
      </div>
      <div className="lg:ml-72">
        <Outlet />
      </div>
      <div className="lg:hidden">
        <button onClick={openDrawer} className="absolute top-2 left-2 z-50">
          <FaBars className="text-3xl" />
        </button>
        <DrawerBar open={open} closeDrawer={closeDrawer} />
      </div>
    </main>
  );
}
