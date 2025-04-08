import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/layout/AdminLayout";
import {useRouter} from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import {useDispatch, useSelector} from "react-redux";
import {CreateAdminCart, getallproducts} from "@/config/redux/action/adminAction";
import style from "./style.module.css";
import {BASE_URL} from "@/config";

export default function Dashboard() {

    const {productFetched, fetchedProducts} = useSelector((state) => state.adminReducer);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem("token")) {
           router.push("/login");
        }
    },[]);

    useEffect(() => {
        dispatch(getallproducts({token:localStorage.getItem("token")}));
    },[])
    return (

      <AdminLayout>
          <DashboardLayout>

              <div className={style.mainContainer}>
                  <div className={style.header}>
                      <h2>Speakers</h2>
                      <h6>Enjoy rich, clear sound with our speaker, perfect for music, movies, and gaming.</h6>
                  </div>
                  <div className={style.container}>
                      {productFetched ? console.log(fetchedProducts.product) : "Loading..."}
                      {productFetched && fetchedProducts?.product?.length > 0 ? (
                          fetchedProducts.product.map((data) => (
                              <div key={data._id} className={style.productContainer}>
                                  <div
                                      onClick={() => router.push(`viewPost/${data._id}`)}
                                      className={style.product}
                                  >
                                      <img
                                          className={style.image}
                                          src={`${BASE_URL}/${data.media}`}
                                          alt={data.name}
                                          width={300}
                                          height={300}
                                      />
                                  </div>
                                  <div className={style.info}>
                                      <textarea className={style.name}>{data.name}</textarea>
                                      <div className={style.price}>
                                          <div className={style.priceInfo}>

                                              <p style={{ textDecoration: "line-through", color: "gray",}}>₹{data.Price}</p>
                                              <p className={style.discountedPrice}>₹{data.discountedPrice}</p>

                                          </div>
                                      </div>
                                      <div className={style.btns}>
                                          <button onClick={()=>{router.push(`viewPost/${data._id}`)}}>
                                             Buy

                                          </button>
                                          <button onClick={()=>{
                                              dispatch(CreateAdminCart({token:localStorage.getItem("token"), productid:data._id}));
                                          }}>Cart
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <h1>LOading</h1>
                      )}
                  </div>
              </div>

          </DashboardLayout>
      </AdminLayout>
    );
  }