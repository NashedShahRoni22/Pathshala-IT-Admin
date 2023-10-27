import React from "react";
import {
  Drawer,
} from "@material-tailwind/react";
import Sidebar from "./Sidebar";
 
export function DrawerBar({open, closeDrawer}) {
  return (
    <React.Fragment> 
      <Drawer open={open} onClose={closeDrawer}>
        <Sidebar/>
      </Drawer>
    </React.Fragment>
  );
}