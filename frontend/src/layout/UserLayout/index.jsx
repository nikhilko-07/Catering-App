import React from 'react';
import UserNavbarComponent from "@/Components/UserNavbar";

export default function UserLayout({children}){
    return(<>
        <UserNavbarComponent/>
        {children}
    </>)
}