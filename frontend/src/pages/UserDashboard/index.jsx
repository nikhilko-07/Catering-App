import React, {useEffect, useState} from "react";
import UserLayout from "@/layout/UserLayout";
import style from "./style.module.css"
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, getuserProduct} from "@/config/redux/action/userAction";
import  "bootstrap/dist/css/bootstrap.min.css"
import {useRouter} from "next/router";
import { BASE_URL } from "@/config";


export default function UserDashboard(){

    const router = useRouter();
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.userReducer)

    const {InfoGet, userProduct} = useSelector((state) => state.userReducer);

    const [fileContent, setFileContent] = useState();
    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[description, setDescription] = useState("");
    const[discountedprice, setDiscountedprice] = useState("");



    const handleUpload = async ()=>{
        dispatch(createProduct({
            file: fileContent,
            name: name,
            price: price,
            description: description,
            discountedprice: discountedprice,
        }))
    }
    useEffect(() => {
        dispatch(getuserProduct({usertoken:localStorage.getItem("usertoken")}))
    },[])


    return (<UserLayout>
        <UserDashboardLayout>

            <div className={style.createPostContainer}>
        <div>

                <div className={style.inputTag}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={"Add Name"}
                        className={style.textAreaOfContent}
                        name={""}
                        id={""}
                    ></input>
                </div>
                <div  className={style.inputTag}>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder={"Add Price "}
                         type="number"
                        className={style.textAreaOfContent}
                        name={""}
                        id={""}
                    ></input>
                </div>
                <div  className={style.inputTag}>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder={"description"}
                        className={style.textAreaOfContent}
                        name={""}
                        id={""}
                    ></input>
                </div>
                <div  className={style.inputTag}>
                    <input
                        onChange={(e) => setDiscountedprice(e.target.value)}
                        value={discountedprice}
                        placeholder={"discountedprice"}
                        className={style.textAreaOfContent}
                        name={""}
                        type="number"
                        id={""}
                    ></input>
                </div>

                <label htmlFor={"fileUpload"} className={style.addFile}>
                    <p style={{cursor:"pointer"}}>Add File</p>
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

                    {name.length > 0 && description.length > 0 && discountedprice.length > 0 && price.length > 0 ?   <div  onClick={async ()=>{
                       await handleUpload()
                    }}  className={style.sendBtn}>
                        Send
                    </div>  : null }
                   

            -</div>
      </div>


            <div className={style.container}>
         
                    <div className={style.productContainer}>
                {InfoGet ? userProduct.product.map((items)=>(
                    <div className={style.product}>
                    <div>
                        <img className={style.productImg} src={`${BASE_URL}/${items.media}`} />
                    </div>
                    <div className={style.infoContaienr}>
                    <div className={style.name}>
                        <textarea readOnly={true}>{items.name}</textarea>
                    </div>
                    <div className={style.price}>
                        <h3 style={{fontSize:"1rem", color:"gray",textDecoration:"line-through"}}>₹{items.Price}</h3>
                        <h4 className={style.discountedPrice}>₹{items.discountedPrice}</h4>
                    </div>
                    </div>

                    </div>)) : <h1>Loading...</h1>}

                    </div>
            </div>
        </UserDashboardLayout>
    </UserLayout>)
}