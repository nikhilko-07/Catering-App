import React, {useEffect, useState} from 'react';
import styles from "./style.module.css";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {loginAdmin, registerAdmin} from "@/config/redux/action/adminAction";
import {setTokenisthere} from "@/config/redux/reducer/adminReducer";
import AdminLayout from "@/layout/AdminLayout";
import  "bootstrap/dist/css/bootstrap.min.css"


function LoginComponent(){

    const adminReducer = useSelector(state => state.adminReducer);
    const router = useRouter();
    const dispatch = useDispatch();

    const [userLoginMethod, setuserLoginMethod] = useState(false);
    const [username, setusername] = useState("");
    const [name, setname] =  useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => {
        if(adminReducer.isLoggedIn){
            router.push("/login");
        }
        dispatch(setTokenisthere)
    }, []);

    useEffect(() => {
        if(localStorage.getItem("token")){
            router.push("/Dashboard");
        }
    },[])
    const handleRegister = () => {
         dispatch(registerAdmin({username, name, email, password}))
    }

    const handleLogin = async () => {
        await dispatch(loginAdmin({email, password}))
        await router.push("/Dashboard");
    }

    return(<AdminLayout>
       <div className={styles.container}>

<div className={styles.registerContainer}>
           <div className={styles.inputContainer}>

               <div className={styles.header}>
               {!userLoginMethod ? <h1>Register</h1>: <h1>Login</h1>}
           <p style={{color:"red"}}> {adminReducer.message.message} </p>
               </div>
        {!userLoginMethod && <div className={styles.inputRow}>
            <input onChange={(e) => setusername(e.target.value)} placeholder={"username"}
                   type={"username"} name={username}/>
            <input onChange={(e) => setname(e.target.value)} placeholder={"name"} type={"name"}
                   name={name}/>
        </div>}


        <input onChange={(e) => setemail(e.target.value)} placeholder={"Email"} type={"email"}
               name={email}/>
        <input onChange={(e) => setpassword(e.target.value)} placeholder={"password"} type={"password"}
               name={password}/>

        <div className={styles.btnContainer}>
    <button onClick={()=>{
        if(userLoginMethod){
        handleLogin();
        }else {
        handleRegister();
        }
    }} className={styles.submitBtn}> {userLoginMethod ? "Sign in" : "Sign up"}</button>
        </div>
        </div>



    <div  className={styles.loginContainer}>
        <h4 className={styles.loginintro}>{userLoginMethod ? "Create a new account" : "Already you have an account"} </h4>


            <p style={{color:"skyBlue", cursor:"pointer"}} onClick={() => {
                setuserLoginMethod(!userLoginMethod);
            }} className={styles.submitBtn }> {userLoginMethod ? "Sign up" : "Sign in"}</p>


    </div>
</div>
</div>
    </AdminLayout>)
}

export default LoginComponent;