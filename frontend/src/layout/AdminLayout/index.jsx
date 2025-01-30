import NavbarComponent from "@/Components/Navbar";
import React from "react";

function AdminLayout({ children }) {
       return (
           <div >
               <NavbarComponent/>
               {children}
           </div>
       )
}
export default AdminLayout;