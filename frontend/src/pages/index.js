import React from "react";
import {useRouter} from "next/router";
import AdminLayout from "@/layout/AdminLayout";
import style from "./index.module.css";

export default function Home(){

  const router = useRouter();

  return(<AdminLayout>
    <div className={style.container} >
        <div className={style.adminContainer}>
            <h4>ADMIN DASHBOARD</h4>

            <div className={style.btnContainer}>

            <button style={{width: "80px", height: "40px", fontSize: '1.5rem',}} onClick={() => {
                router.push("/Dashboard")
            }}>Go
            </button>
            </div>
        </div>
        <div className={style.userContainer}>
            <h4>USER DASHBOARD</h4>
            <div className={style.btnContainer}>

        <button style={{width: "80px", height: "40px", fontSize: '1.5rem',}} onClick={() => {
          router.push("/UserDashboard");
        }}>Go
        </button>
          </div>
      </div>

    </div>
  </AdminLayout>)
}