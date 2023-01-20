import React, {useCallback, useEffect, useState} from "react";
import Header from "../includes/header";
import Navbar from "../includes/navbar";
import styles from "../styles/Home.module.css";
import Constants from "../constants/Constants";
import Footer from "../includes/footer";
import Link from "next/link";

export default function Cart() {

    const [cartList, setCartList] = useState([]);

    const getCart = useCallback(async () => {
        const result = await fetch(`${Constants.HOST}/api/carritos?populate[productos][populate][0]=imagen&populate[productos][populate][1]=categorias&filters[client_id][$eq]=${window.sessionStorage.getItem('client_id')}&filters[comprado][$eq]=${false}`)
        if (result.status === 200) {
            const {data: cartList} = await result.json();
            setCartList(cartList);
        }
    }, []);

    useEffect(() => {
        (async () => await getCart())();
    }, [getCart]);

    const getTotalPrice = () => {
        let price = 0;
        let productsArr = [];
        if (cartList.length > 0) {
            cartList.map((item) => {
                const {
                    attributes: {productos: {data: productList}}
                } = item;
                productsArr = [...productsArr, ...productList];
            });
            price = productsArr.map((item) => item.attributes.precio_unidad).reduce((prev, curr) => prev + curr, 0);
        }
        return price.toLocaleString('en-US');
    };

    const handleRemove = async id => {
        try {
            const result = await fetch(`${Constants.HOST}/api/carritos/${id}`, {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                method: "DELETE"
            });
            if (result.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar/>
            <main>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.subtitleLabel}>
                                <h1>Carrito ({cartList.length})</h1>
                            </div>
                            <div className="content">
                                <div className="container">
                                    <div className="row">
                                        {
                                            cartList.length > 0 &&
                                            <div className="card p-5" style={{width: 1200, margin: "auto"}}>
                                                <div className="card-body">
                                                    {
                                                        cartList.length > 0 && cartList.map((item) => {
                                                            const {id, attributes: {productos: {data: productList}}} = item;
                                                            return (
                                                                <div key={id} className="col-12 product-container">
                                                                    <div className={"cart-product-container p-4"}>
                                                                        <div className={"product-preview-container"}>
                                                                            <div>
                                                                                <img
                                                                                    src={`${Constants.HOST}${productList[0].attributes.imagen.data[0].attributes.url}`}
                                                                                    width={48}
                                                                                    alt={productList[0].attributes.titulo}/>
                                                                            </div>
                                                                            <div className={"product-details"}>
                                                                                <Link href={`/productos/${productList[0].id}`}>
                                                                                    <a>
                                                                                        <h3 className={"ml-5"}>{productList[0].attributes.titulo}</h3>
                                                                                    </a>
                                                                                </Link>
                                                                                <p>Categoría: {productList[0].attributes.categorias.data[0].attributes.nombre}</p>
                                                                                <div className={"cta-container"}>
                                                                                    <button type="button"
                                                                                            onClick={() => handleRemove(id)}
                                                                                            className="btn btn-link">Eliminar
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="price">
                                                                            <h1>${productList[0].attributes.precio_unidad.toLocaleString('en-US')}CLP</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="card-footer pb-5 pt-4">
                                                    <div className={"total-amount pb-4"}>
                                                        <h1>Total: ${getTotalPrice()}CLP</h1>
                                                    </div>
                                                    <div className="float-end mt-4">
                                                        <Link href="/productos">
                                                            <button className="btn btn-default" type="button">Seguir
                                                                comprando
                                                            </button>
                                                        </Link>
                                                        <Link href="/checkout">
                                                            <button className="btn btn-primary" style={{marginLeft: 20}}
                                                                    type="button">Continuar compra
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            !cartList.length &&
                                            <p className="text-center">No tienes productos seleccionados.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
};
