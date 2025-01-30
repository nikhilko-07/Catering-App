import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {setTokenisthere} from "@/config/redux/reducer/adminReducer";

export default function DashboardLayout({children}){

    const router = useRouter();
    const dispatch = useDispatch();
    const adminReducer = useSelector(state => state.adminReducer);
    useEffect(()=>{
        if(localStorage.getItem("token") == null){
            router.push("/login");
        }
        dispatch(setTokenisthere())
    },[])

    return (<>
        {children}
    </>)
}