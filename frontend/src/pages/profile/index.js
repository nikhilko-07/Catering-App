import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import  "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/config";
import AdminLayout from "@/layout/AdminLayout";
import {
    getOwnProfile,
    updateProfileAdminInfo,
    updateProfilePicture
} from "@/config/redux/action/adminAction";


export default function Profile() {
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");
    const [mobile, setMobile] = useState("");
    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();
    const adminReducer = useSelector((state) => state.adminReducer);

    useEffect(() => {
        dispatch(getOwnProfile({ token: localStorage.getItem("token") }));
    }, []);

    const updateProfilePic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await dispatch(updateProfilePicture(file)); // Pass the file directly
            await dispatch(getOwnProfile({ token: localStorage.getItem("token") }));
        }
    };
    const sethandleInfo = async () => {
        await dispatch(updateProfileAdminInfo({ token: localStorage.getItem("token"), bio, address, mobile }));
    };

    if (adminReducer.profileFetched) {
        return (
            <AdminLayout>
                <div className={style.profileContainer}>
                    {!edit ? (
                        <div className={style.wrapperDiv}>
                            {adminReducer.profileFetched && (
                                <div className={style.card} >
                                    <label htmlFor="profilePictureUpload">
                                        <div className={style.profileImg}>

                                        <img
                                            src={`${BASE_URL}/${adminReducer.admin.adminId.profilePicture}`}
                                            alt="Profile"
                                        />
                                        </div>
                                    </label>
                                    <div className={style.cardInfo}>

                                    <div  className="card-body">
                                        <input hidden={true} onChange={updateProfilePic} type="file" id="profilePictureUpload" />
                                        <h5 className="card-title" >Name: {adminReducer.admin.adminId.name}</h5>
                                        <p className="card-text" >Bio: {adminReducer.admin.bio}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li  className={` ${style.address}`}>Address: {adminReducer.admin.address}</li>
                                    </ul>
                                    <div className={ style.contactInfo}>
                                        <a className="card-link">Email: {adminReducer.admin.adminId.email}</a>
                                        <a className="card-link">Mobile: {adminReducer.admin.mobile}</a>
                                    </div>
                                             <div className={style.editBtn}>
                                             <button onClick={()=>setEdit(true)}>Edit</button>
                                             </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={style.wrapperDiv}>
                            <div className={style.editContainer}>
                                <div className={style.closeBtn}>
                                    <button onClick={() => setEdit(false)}>Close</button>
                                </div>
                                <div className={style.editInput}>
                                    <input onChange={(e) => setAddress(e.target.value)} type="text" value={address} placeholder="Address" />
                                    <input onChange={(e) => setBio(e.target.value)}  type="text" value={bio} placeholder="Bio" />
                                    <input onChange={(e) => setMobile(e.target.value)} type="text" value={mobile} placeholder="Phone" />
                                </div>
                                {bio.length > 20 ? <div className={style.bioError}>Bio Length is max</div> : <div className={style.closeBtn}>
                                    <button
                                        className={style.DoneBtn}
                                        onClick={async () => {
                                            setEdit(false);
                                            await sethandleInfo();
                                            await dispatch(getOwnProfile({token: localStorage.getItem("token")}));
                                        }}
                                    >
                                        Done
                                    </button>
                                </div>}

                            </div>
                        </div>
                    )}
                </div>
            </AdminLayout>
        );
    } else {
        return (
            <AdminLayout>
                Loading...
            </AdminLayout>
        );
    }
}
