import React, {useEffect, useState} from 'react';
import AdminLayout from "@/layout/AdminLayout";
import {CreateAdminCart, createorder, productInfo} from "@/config/redux/action/adminAction";
import {useDispatch, useSelector} from "react-redux";
import style from "./style.module.css";
import {BASE_URL} from "@/config";

export default function buyProduct({_id}) {

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [pinCode, setPinCode] = useState();
    const [address, setAddress] = useState();

    const dispatch = useDispatch();
    const {productInfoFetched, infoOfProducts} = useSelector((state)=> state.adminReducer);

    useEffect(()=>{
        dispatch(productInfo({token:localStorage.getItem("token"), productid:_id}));
    },[])

    const handleCreate = async ()=>{
        dispatch(createorder({
            token:localStorage.getItem("token"),
            productid:_id,
            name:name,
            phone:phone,
            pinCode:pinCode,
            address:address,
        }))
    }

    return(<>
        <AdminLayout>
            <div className={style.mainContainer}>
                {productInfoFetched ? <div className={style.container}>
                    <div className={style.product}>
                        <div>
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

                            </div>
                        </div>

                        </div>
                    <div className={style.formContainer}>
                        <div>
                            <h1 style={{textAlign:"center"}}>Form</h1>
                        </div>
                        <div>
                            <input placeholder={"Name"} onChange={(e)=>setName(e.target.value)} value={name} type={"text"}/>
                            <input placeholder={"Phone"} onChange={(e)=>setPhone(e.target.value)} value={phone} type={"number"}/>
                            <input placeholder={"Address"} onChange={(e)=>setAddress(e.target.value)} value={address} type={"text"}/>
                            <input placeholder={"PinCode"} onChange={(e)=>setPinCode(e.target.value)} value={pinCode} type={"number"}/>
                            <div className={style.btns}>
                                <button onClick={handleCreate}>Order it</button>
                            </div>
                        </div>
                    </div>
                    </div>

                </div> : <h1>Loading...</h1>}
            </div>
        </AdminLayout>
    </>)
}

export async function getServerSideProps(context) {
    const {_id} = context.query;
    return {
        props: {_id},
    }
}