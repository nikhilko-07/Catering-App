import React, {useEffect} from "react";
import UserLayout from "@/layout/UserLayout";
import style from "./style.module.css"
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "@/config/redux/action/userAction";
import {getAllAdminsPosts} from "@/config/redux/action/userPostsAction";
import {BASE_URL} from "@/config";
import  "bootstrap/dist/css/bootstrap.min.css"
import {useRouter} from "next/router";


export default function UserDashboard(){

    const router = useRouter();
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer)
    const {posts} = useSelector((state) => state.userPostReducer)

    useEffect(  () => {
        if(userReducer.isUserTokenThere){
             dispatch(getUserInfo({Usertoken:localStorage.getItem("Usertoken")}));
             dispatch(getAllAdminsPosts());
        }
    },[userReducer.isUserTokenThere])
    {console.log(posts)}



    return (<UserLayout>
        <UserDashboardLayout>
            <div className={style.container}>
            {posts.map((post) => (<div className={style.wrapper}>

                <div style={{cursor: "pointer"}} onClick={()=>{router.push(`/viewadminspost/${post._id}`)}} className={`card ${style.card}`} >
                    <img  className="card-img-top"  src={`${BASE_URL}/${post.media}`} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{post.soilType}</h5>
                        <div className={style.postedBy}>
                        <p >Posted by :</p> &nbsp; &nbsp;
                        <p >{post.adminId.name}</p>
                        </div>
                    </div>
                </div>
                </div>
                ))}
            </div>
        </UserDashboardLayout>
    </UserLayout>)
}