import { BASE_URL } from "@/config";
import style from "./style.module.css";
import { getprofilebyid, getUserInfo } from "@/config/redux/action/userAction";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewAdminProfile({ adminId }) {
  const { fetchedData, InfoGet } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getprofilebyid({ adminId }));
    dispatch(getUserInfo({ Usertoken: localStorage.getItem("Usertoken") }));
  }, []);

  {
    console.log(fetchedData);
  }

  return (
    <UserLayout>
     {InfoGet ?  <div className={style.container}>
        <div className={style.card}>
          <div className={style.imgContainer}>
          <img
            src={`${BASE_URL}/${fetchedData.adminInfo.profilePicture}`}
            alt="..."
          />
          </div>
          <div className={style.infoContainer}>
          <div className={style.adminName}>
            <h5>Name : &nbsp;{fetchedData.adminInfo.name}</h5>
            <h5>Username : &nbsp;{fetchedData.adminInfo.username}</h5>
          </div>
            <div className={style.bio}>
              <p > <textarea disabled={true}>{fetchedData.adminProfile.bio}</textarea></p>
            </div>
            <div className={style.contactInfo}>Address : &nbsp;
              {fetchedData.adminProfile.address}
            <a>Email : &nbsp;{fetchedData.adminInfo.email}</a>
            <a>Mobile No: &nbsp;{fetchedData.adminProfile.mobile}</a>
          </div>
          </div>
        </div>
      </div> : <div>Loading...</div>}
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  const { adminId } = context.query;
  return {
    props: { adminId },
  };
}
