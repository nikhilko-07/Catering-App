import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {setuserTokenisThere} from "@/config/redux/reducer/userReducer";
import {getUserInfo} from "@/config/redux/action/userAction";

export default function UserDashboardLayout({children}) {

    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        if(localStorage.getItem("Usertoken") === null) {
            router.push("/userLogin");
        }
        dispatch(setuserTokenisThere())
        dispatch(getUserInfo({Usertoken: localStorage.getItem("Usertoken")}))
    }, []);

    return (<>{children}</>)
}