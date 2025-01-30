import React, { useEffect } from 'react';
import UserLayout from '@/layout/UserLayout';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@/config/redux/action/userAction";
import { getAdminPostById } from "@/config/redux/action/userPostsAction";
import style from "./style.module.css";
import { BASE_URL } from "@/config";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/router';
import {clearPostData} from "@/config/redux/reducer/userPostsReducer";

export default function ViewAdminsPosts({ _id }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { getPost, postsLoaded } = useSelector((state) => state.userPostReducer);

    useEffect(() => {
        dispatch(getUserInfo({ Usertoken: localStorage.getItem("Usertoken") }));
    }, []);

    useEffect(() => {
        if (_id) {
            dispatch(clearPostData()); // Clear previous post data
            dispatch(getAdminPostById(_id));
        }
    }, [_id]); // Add _id as a dependency

    return (
        <UserLayout>
            <div className={style.container}>
                {postsLoaded ? (
                    <div className={style.card}>
                        <div className={style.imgContainer}>
                            <img src={`${BASE_URL}/${getPost.postById.media}`} alt="Card image cap" />
                        </div>
                        <div className={style.infoContainer}>
                            <h2>{getPost.postById.soilType}</h2>
                            <textarea disabled={true}>{getPost.postById.body}</textarea>
                            <button className={style.ViewProfileBtn} onClick={() => { router.push(`/ViewAdminProfile/${getPost.postById.adminId}`) }}>View Profile</button>
                        </div>
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </UserLayout>
    );
}

export async function getServerSideProps(context) {
    const { _id } = context.query;
    return {
        props: { _id },
    };
}
