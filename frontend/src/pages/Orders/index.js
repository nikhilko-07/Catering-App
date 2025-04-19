import React, {useEffect} from "react";
import AdminLayout from "@/layout/AdminLayout";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getadminOrders} from "@/config/redux/action/adminAction";
import {BASE_URL} from "@/config";
import {useRouter} from "next/router";

export default function Cart(){

    const router = useRouter();
    const {ordersFetched, fetchedOrders} = useSelector((state)=> state.adminReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getadminOrders({token: localStorage.getItem("token")}));
    },[])

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            router.push("/login");
        }
    },[])


    return (<>
    <AdminLayout>
        <div className={style.container}>
            <div className={style.orderContainer}>
                {ordersFetched ? fetchedOrders.order.map((cart) => {
                    return (
                        <div className={style.cartItem} key={cart.productId._id}>
                            <div className={style.cartImg}>
                                <img src={`${BASE_URL}/${cart.productId.media}`} alt={cart.productId.name} />
                            </div>
                            <div className={style.info}>

                                <div className={style.cartInfo}>
                                    <p>Name :{cart.name}</p>
                                    <p>Phone :{cart.phone}</p>
                                    <p>Address : {cart.address}</p>
                                </div>
                                <div className={style.productInfo}>
                                    <p>Product Name  :{cart.productId.name}</p>
                                    <p>Product Price :{cart.productId.Price}</p>
                                </div>
                                <div className={style.btns}>
                                    <button>
                                        {cart.status ? "Deliver" : "Pending"}
                                    </button>
                                </div>
                            </div>
                            {console.log(cart)}
                        </div>

                    );
                }) : <h1>Loading...</h1>}

            </div>
        </div>
    </AdminLayout>
    </>)
}