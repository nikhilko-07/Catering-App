import React, {useEffect} from "react";
import AdminLayout from "@/layout/AdminLayout";
import {useDispatch, useSelector} from "react-redux";
import style from "./style.module.css";
import {CreateAdminCart, productInfo} from "@/config/redux/action/adminAction";
import {BASE_URL} from "@/config";
import {useRouter} from "next/router";

export default function ViewPost({_id}){

    const router = useRouter();
    const {productInfoFetched, infoOfProducts} = useSelector((state)=> state.adminReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productInfo({token:localStorage.getItem("token"), productid:_id}));
    },[])

    return (
        <AdminLayout>
            <div className={style.mainContainer}>
                {productInfoFetched ? <div className={style.container}>
                    <div className={style.product}>
                        <div className={style.imgContainer}>
                            <img className={style.productImg} src={`${BASE_URL}/${infoOfProducts.media}`} alt="product"/>
                        </div>
                        <div>
                            <div className={style.info}>
                                <h1>{infoOfProducts.name}</h1>
                                <textarea readOnly={true} className={style.description}>{infoOfProducts.Description}</textarea>
                                <h4 className={style.price}><p style={{color:"gray",textDecoration:"line-through",fontSize:"1rem"}}>₹{infoOfProducts.Price}</p><p>₹  {infoOfProducts.discountedPrice}</p></h4>
                            <div className={style.list}>
                                <li>Power Output(RMS): 10 W</li>
                                <li>Power Source: RECHARGEABLE BATTERY</li>
                                <li>Battery life:5 hr | Charging time: 2 hr</li>
                                <li>Bluetooth Version: 5.0</li>
                            </div>
                                <div className={style.btns}>
                                <button onClick={()=>{
                                    dispatch(CreateAdminCart({token:localStorage.getItem("token"), productid: infoOfProducts._id}));
                                }}>Cart</button>
                                <button onClick={() => router.push(`/buyProduct/${infoOfProducts._id}`)}>Buy</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div> : <h1>Loading...</h1>}
            </div>
        </AdminLayout>
    )
}

export async function getServerSideProps(context) {
    const { _id } = context.query;
    return {
        props: { _id },
    };
}
