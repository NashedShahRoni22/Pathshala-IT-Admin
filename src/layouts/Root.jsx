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
    <main className="flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="md:hidden">
        <button onClick={openDrawer} className="absolute top-2 left-2">
          <FaBars className="text-3xl" />
        </button>
        <DrawerBar open={open} closeDrawer={closeDrawer} />
      </div>
    </main>
  );
}
