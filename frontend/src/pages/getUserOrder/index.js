import React, {useEffect} from "react";
import UserLayout from "@/layout/UserLayout";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {changetheStatus, Getuserorder} from "@/config/redux/action/userAction";
import {BASE_URL} from "@/config";

export default function getUserorder(){

    const dispatch = useDispatch();
    const {orderGet, orderList} = useSelector((state)=> state.userReducer)

    useEffect(() => {
        dispatch(Getuserorder({
            usertoken: localStorage.getItem("usertoken"),
        }))
    },[])

    return(<>

    <UserLayout>
        <div className={style.container}>
            {orderGet ? orderList.orders.map((order, idx) => {
                console.log(order); // move console.log outside the return

                return (
                    <div className={style.mainContainer} key={idx}> {/* key goes here */}
                        <div className={style.order}>
                            <div className={style.imgContainer}>
                                <img src={`${BASE_URL}/${order.productId.media}`} alt=""/>
                            </div>
                            <div>
                                <h3>Name : {order.name}</h3>
                                <h3>Phone : {order.phone}</h3>
                                <textarea readOnly={true} className={style.address}>{`Address : ${order.address}`}</textarea>
                                <h3>Pincode : {order.pinCode}</h3>
                            </div>
                            <div className={style.productInfo}>
                                <h3>Product Name : {order.productId.name}</h3>
                                <h3>Price : {order.productId.discountedPrice}</h3>
                            </div>
                            {!order.status ? <div>
                                <button className={style.btn}
                                    onClick={async () => {
                                        const usertoken = localStorage.getItem("usertoken");

                                        await dispatch(changetheStatus({
                                            usertoken,
                                            orderid: order._id
                                        }));

                                        dispatch(Getuserorder({ usertoken }));
                                    }}
                                >
                                    Confirm
                                </button>
                            </div> : <button className={style.btn} disabled={true}>done</button> }
                        </div>
                    </div>
                );
            }) : <h1>LoAdInG...</h1>}
        </div>


    </UserLayout>
    </>)
}