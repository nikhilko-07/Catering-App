import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOwnProfile, getProfilebyUsername} from "@/config/redux/action/adminAction";
import {BASE_URL} from "@/config";
import  "bootstrap/dist/css/bootstrap.min.css"
import style from "./style.module.css"
import AdminLayout from "@/layout/AdminLayout";

export default function UserName({ username }) {

    const dispatch = useDispatch();
    const {Profile, profileFetcher} = useSelector(state => state.adminReducer)
    {console.log(Profile)}
    useEffect(() => {
        if (username) {
            dispatch(getProfilebyUsername(username));
        }
    }, [username, dispatch]); // Add username and dispatch to the dependency array

    useEffect(() => {
        getOwnProfile({token:localStorage.getItem("token")});
    }, []);

    return (<AdminLayout>
        <div className={style.container}>{profileFetcher ? (
            <div className={style.card} >
            <div className={style.cardImg}>
            <img src={`${BASE_URL}/${Profile.admin.profilePicture}`} alt="..."/>
       </div>
       <div className={style.AdminInfo}>
            <div className={style.adminName}>
                <h5>Name: {Profile.admin.name}</h5>
                <h5>Username: {Profile.admin.username}</h5>
            </div>
            <div className={style.bio}>    
                <p><textarea disabled={true}>{Profile.profile.bio}</textarea></p>
            </div>
          
            <div className={style.contactInfo} >
                <a>Address: {Profile.profile.address}</a>
                <a >Email: {Profile.admin.email}</a>
                <a >Mobile: {Profile.profile.mobile}</a>
            </div>
            </div>
        </div>) : (<div>Loading...</div>)}

        </div>
    </AdminLayout>);
}

export async function getServerSideProps(context) {
    const {username} = context.query;
    return {props: {username}}; // Ensure the prop name matches the component's prop
}