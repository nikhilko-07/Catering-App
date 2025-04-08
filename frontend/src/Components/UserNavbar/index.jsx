import React from "react";
import style from "./style.module.css";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";

export default function UserNavbarComponent(){

    const router = useRouter();
    return(<div className={style.container}>
        <h1 className={style.logo} style={{cursor:"pointer"}} onClick={()=>{router.push("/")}}>Catering Reservation &
            Ordering System</h1>

       <div className={style.Btns}>
          <button onClick={()=>{router.push("/getUserOrder")}}>Orders</button>
        </div>
    </div>)
}