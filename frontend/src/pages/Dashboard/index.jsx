import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import { getOwnProfile } from "@/config/redux/action/adminAction";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "@/config/redux/action/postAction";
import { BASE_URL } from "@/config";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/layout/AdminLayout";

export default function Dashboard() {
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const adminReducer = useSelector((state) => state.adminReducer);
  const [fileContent, setFileContent] = useState();
  const [content, setContent] = useState("");
  const [soil, setSoil] = useState("");

  const router = useRouter();

  const handelUpload = async () => {
    await dispatch(
      createPost({ file: fileContent, body: content, soilType: soil })
    );
    dispatch(getAllPosts());
  };

  useEffect(() => {
    if (adminReducer.isTokenThere) {
      dispatch(getOwnProfile({ token: localStorage.getItem("token") }));
      dispatch(getAllPosts());
    }
  }, [adminReducer.isTokenThere]);

  if (adminReducer.profileFetched) {
    return (
      <AdminLayout>
        <DashboardLayout>
          {adminReducer.profileFetched && (
            <div className={style.wrapperCreateContainer}>
              <div>
                <div className={style.createPostContainer}>
                  <div className={style.inputTag}>
                    <span className={style.tag}>Content</span>
                    <input
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                      placeholder={"Add content"}
                      className={style.textAreaOfContent}
                      name={""}
                      id={""}
                    ></input>
                  </div>
                  <div  className={style.inputTag}>
                    <span className={style.tag}>Soil Type</span>
                    <input
                      onChange={(e) => setSoil(e.target.value)}
                      value={soil}
                      placeholder={"Add Soil "}
                      className={style.textAreaOfContent}
                      name={""}
                      id={""}
                    ></input>
                  </div>
                  <label htmlFor={"fileUpload"} className={style.addFile}>
                    <p>Add File</p>
                  </label>
                  <input
                    className={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => setFileContent(e.target.files[0])}
                    type={"file"}
                    hidden={true}
                    id={"fileUpload"}
                  />

                  {content.length > 0 && soil.length > 0 && soil.length < 20 &&   (
                    <div onClick={handelUpload} className={style.sendBtn}>
                      Send
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className={style.postContainer}>
            {postReducer.posts.map((post) => {
              return (
                <div
                  key={post._id}
                  className={style.wrapperPostContainer}
                >
                  <div className={`card ${style.card}`}>
                    <img
                      onClick={() => {
                        router.push(`/view_Post/${post._id}`);
                      }}
                      style={{borderRadius:"10px",cursor:"pointer"}}
                      className="card-img-top"
                      src={`${BASE_URL}/${post.media}`}
                      alt="Card image cap"
                    />
                    <div className="card-body" style={{paddingTop:"0",paddingBottom:"0"}}>
                      <div style={{display:'flex',alignItems:"center", textAlign:'center',justifyContent:"space-between"}}>
                      <h5 >{post.soilType}</h5>
                      <h5  style={{marginTop:"10px"}} className="card-title"> {post.adminId._id ===
                          adminReducer.admin.adminId._id && (
                          <h5
                            style={{ cursor: "default" }}
                            className={style.delete}
                              onClick={async () => {
                                await dispatch(
                                  deletePost({ post_id: post._id })
                                );
                                await dispatch(getAllPosts());
                              }}
                          >
                            <svg
                              style={{ cursor: "pointer" }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </h5>
                        )}</h5>
                        </div>
                        <div style={{display:'flex',alignItems:"center", textAlign:'center',color:'dimgray'}}>
                            <p className="card-text">Posted by :</p>&nbsp;&nbsp;<p >{post.adminId.name}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                       
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardLayout>
      </AdminLayout>
    );
  } else {
    return (
      <AdminLayout>
        <DashboardLayout>Loading...</DashboardLayout>
      </AdminLayout>
    );
  }
}