import React from "react";
import style from "./style.module.css";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {reset} from "@/config/redux/reducer/userReducer";

export default function UserNavbarComponent(){

    const router = useRouter();
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);
    const {userInfo}   = useSelector((state) => state.userReducer);
    return(<div className={style.container}>
        <h1 className={style.logo} style={{cursor:"pointer"}} onClick={()=>{router.push("/")}}>Soil</h1>

       <div className={style.Btns}>
        {userReducer.userProfileInfo && <div className={style.headerInfo}>

            <h5 className={style.hey}>hii, {userInfo.userinfo.name}</h5>
            <h5 className={style.logoutBtn} onClick={()=>{
                localStorage.removeItem("Usertoken");
                dispatch(reset())
                router.push("/userLogin");

            }}>Logout</h5>
        </div>}

        { !userReducer.userProfileInfo && <div><h2 style={{cursor:"pointer"}} onClick={()=>{router.push("/userLogin")}}>Login</h2></div>}
        </div>
    </div>)
}