import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import { reset } from "@/config/redux/reducer/adminReducer";
import {BASE_URL} from "@/config";
export default function NavbarComponent(){


    const router = useRouter();


    return(
        <div className={styles.container}>
            <div>
            <h5 onClick={()=>{router.push("/")}}> Catering Reservation & <br/> Ordering System</h5>
            </div>
            <div className={styles.links}>

            <button onClick={()=>{router.push("/profile")}}>Profile</button>
            <button onClick={()=>{router.push("/Cart")}}>cart</button>
            <button onClick={()=>{router.push("/Orders")}}>Orders</button>
            </div>

        </div>
    )
}