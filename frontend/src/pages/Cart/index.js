import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {adminCart, DeleteCart} from "@/config/redux/action/adminAction";
import AdminLayout from "@/layout/AdminLayout";
import style from "./style.module.css";
import {BASE_URL} from "@/config";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cart(){

    const {cartFetched, fetchedCart} = useSelector((state)=> state.adminReducer);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(adminCart({token: localStorage.getItem("token")}));
    }, []);
    return(<>
        <AdminLayout>
            <div className={style.container}>
                <div className={style.cartContainer}>
                    {cartFetched ? fetchedCart.getCart.map((item) => {
                        return (
                            <div key={item.productId._id} className={style.cartItem}>
                                <div className={style.imgContainer}>
                                    <img src={`${BASE_URL}/${item.productId.media}`}/>
                                </div>
                                <div className={style.cartInfo}>
                                    <h4>{item.productId.name}</h4>
                                    <div  className={style.price}><p>₹{item.productId.Price}</p><h4>₹{item.productId.discountedPrice}</h4></div>
                                <div className={style.btns}>
                                    <button onClick={async () => {
                                            const token = localStorage.getItem("token");
                                            await dispatch(DeleteCart({ token:token , cartid: item._id }));
                                            dispatch(adminCart({ token }));
                                        }}
                                    >delete
                                    </button>
                                </div>
                                </div>
                            </div>
                        );
                    }) : <h1>Loading...</h1>}

                </div>
            </div>
        </AdminLayout>
    </>)
}