import React, {useEffect} from "react";
import UserLayout from "@/layout/UserLayout";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "@/config/redux/action/userAction";
import {setuserTokenisThere} from "@/config/redux/reducer/userReducer";
import {useRouter} from "next/router";

export default function userLogin() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [loginMethod, setLoginMethod] = React.useState(false)

    const router = useRouter();
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer);

    useEffect(() => {
        if(userReducer.userLoggedIn){
            router.push("/login");
        }
        dispatch(setuserTokenisThere)
    }, []);



    useEffect(() => {
        if(localStorage.getItem("Usertoken")){
            router.push("/UserDashboard");
        }
    },[])

    const handleRegister = ()=>{
        dispatch(registerUser({email, name, password, username}))
    }

    const handleLogin = async ()=>{
        await dispatch(loginUser({email, password}));
        await router.push("/UserDashboard");
    }

    return (<UserLayout>
        <div className={style.container}>
            <div className={style.wrapper}>
                {!loginMethod ? <div className={style.registerHeader}>Register</div> : <div className={style.registerHeader}>Login</div>}
                {!loginMethod &&   <div className={style.registerMethod}>
                    <p className={style.error} > {userReducer.message.message}</p>
                <input onChange={(e)=>setUsername(e.target.value)} type={username} value={username} placeholder={"Username"}/>
                <input onChange={(e)=>setName(e.target.value)} type={name} value={name} placeholder={"Name"}/>
                </div>}
               <div className={style.loginMethod}><input onChange={(e)=>setEmail(e.target.value)} type={email} placeholder={"Email"}/> <input onChange={(e)=>setPassword(e.target.value)} type={password} placeholder={"Password"}/></div>
                <div className={style.registerBtn}>
                {!loginMethod ? <button onClick={()=>{handleRegister()}} >Register</button> : <button onClick={()=>{handleLogin()}}>Login</button>}
                </div>
                <div className={style.methodChange}>
                {!loginMethod ? <div><h5>if you have an already account so <div style={{color:"skyblue", cursor:"pointer"}} onClick={()=>{setLoginMethod(!loginMethod)}}>login it</div></h5></div> : <div><h5>if you have not yet account so <div style={{color:"skyblue", cursor:"pointer"}} onClick={()=>{setLoginMethod(!loginMethod)}}>Register it </div></h5></div>}
            </div>
            </div>
        </div>
    </UserLayout>)
}