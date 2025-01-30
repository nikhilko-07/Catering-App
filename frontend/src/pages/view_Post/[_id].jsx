import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPost } from "@/config/redux/action/postAction";
import { BASE_URL } from "@/config";
import style from "./style.module.css";
import {
  getOwnProfile,
  getProfilByID,
} from "@/config/redux/action/adminAction";
import { useRouter } from "next/router";
import AdminLayout from "@/layout/AdminLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import {clearPostData} from "@/config/redux/reducer/postReducer";

export default function ViewProfile({ _id }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { post } = useSelector((state) => state.postReducer); // Adjust the selector based on your state structure
  const { postInfo, profileGet } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(getOwnProfile({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    if (_id) {
      dispatch(clearPostData()); // Clear previous post data
      dispatch(GetPost(_id));
    }
  }, [_id, dispatch]);

  useEffect(() => {
    if (post && post.post) {
      dispatch(getProfilByID({ adminId: post.post.adminId }));
    }
  }, [post, dispatch]);

  return (
      <AdminLayout>
        <div className={style.container}>
          {post ? (
              <div className={style.PostViewContainer}>
                <div className={style.card}>
                  <div className={style.cardImg}>
                    <img
                        src={`${BASE_URL}/${post.post.media}`}
                        alt="Card image cap"
                    />
                  </div>
                  <div className={style.infoContainer}>
                    <h2>{post.post.soilType}</h2>
                    <textarea disabled={true} className={style.body}>{post.post.body}</textarea>
                    <div className={style.adminInfo}>
                      <div>
                        <p>
                          {profileGet ? (
                              <div>Posted by : &nbsp;{postInfo.admin.name}</div>
                          ) : (
                              <div>Loading</div>
                          )}
                        </p>
                        {profileGet ? (
                            <div
                                className={style.ViewProfileBtn}
                                onClick={() => {
                                  router.push(`/View_Profile/${postInfo.admin.username}`);
                                }}
                            >
                              GO TO HIS PROFILE
                            </div>
                        ) : (
                            <div>
                              <a >Loading..</a>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ) : (
              <p>Loading...</p>
          )}
        </div>
      </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;
  return {
    props: { _id },
  };
}
