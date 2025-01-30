import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import { reset } from "@/config/redux/reducer/adminReducer";
import {BASE_URL} from "@/config";
export default function NavbarComponent(){

    const dispatch = useDispatch();
    const adminReducer = useSelector(state => state.adminReducer);
    const router = useRouter();
   

    return(
        <div className={styles.container}>
            <h1 style={{cursor:'pointer'}} onClick={() => {
                router.push("/")
            }}>Soil</h1>

            <div >
            {adminReducer.profileFetched && <div>
                       <div className={styles.navBarOptn}>
                           <p className={styles.hey}>Hey, {adminReducer.admin.adminId.name}</p>
                           <p onClick={()=>{router.push("/profile")}} style={{fontWeight: "bold", cursor: "pointer"}}><img className={styles.profilePic} src={`${BASE_URL}/${adminReducer.admin.adminId.profilePicture}`}/></p>
                           <p className={styles.logoutOptn} onClick={() => {localStorage.removeItem("token");
                               dispatch(reset())
                               router.push("/login");
                           }} style={{fontWeight: "bold", cursor: "pointer"}}>Logout</p>
                       </div>
            </div>}


                {!adminReducer.profileFetched && <div onClick={() => {
                    router.push("/login");
                }} className={styles.buttonJoin}>login</div>}
            </div>

        </div>
    )
}