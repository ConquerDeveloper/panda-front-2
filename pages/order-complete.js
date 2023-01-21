import Header from "../includes/header";
import Navbar from "../includes/navbar";
import styles from "../styles/Home.module.css";
import Footer from "../includes/footer";
import Router from "next/router";
import Constants from "../constants/Constants";
import React, {useEffect, useCallback, useState} from "react";
import { withRouter } from 'next/router';
import emailTemplate from "../includes/email-template";
import GetNavbarProps from "../helpers/GetNavbarProps";

function OrderComplete(props) {
    const [cartList, setCartList] = useState([]);

    const sendEmail = useCallback(async () => {
        try {
            await fetch(`${Constants.HOST}/api/email`, {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    "to": props.router.email,
                    "subject": "Tu compra en Panda Store",
                    "html": emailTemplate(),
                }),
            });
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        (async () => await sendEmail())();
    }, [sendEmail])

    useEffect(() =>{
        if (Object.keys(props.router.query)[0]) {
            if (cartList.length === 0) {
                setCartList(JSON.parse(Object.keys(props.router.query)[0]));
            }
        }
    });

    const handleRedirect = async () => {
        await Router.push("/productos");
    };

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

    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar navbarProps={{
                ...props.navbarProps
            }}/>
            <main>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.subtitleLabel}>
                                <h1>Resumen de tu compra</h1>
                            </div>
                            <div className="content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-8 text-center mx-auto">
                                            <div className="content">
                                                <h2><strong>¡GRACIAS POR SU ORDEN!</strong></h2>
                                                <div className="text-start">
                                                    <p>Su pedido fue ingresado, nuestro equipo lo está revisando para
                                                        confirmar el stock y disponibilidad de sus productos, en las
                                                        próximas 24 horas nos estaremos comunicando para poder finalizar
                                                        el proceso de pago.

                                                        En caso de no tener respuesta en el transcurso indicado, puede
                                                        comunicarse con nosotros a través del siguiente numero
                                                        telefónico +56984021213 (vía WhatsApp) o al correo
                                                        ventaspandastore@gmail.com</p>
                                                    <p className="text-start"><strong>Su orden:</strong></p>
                                                    <div className="my-4 content">
                                                        {
                                                            cartList && cartList.length > 0 && cartList.map((item) => {
                                                                const {
                                                                    id,
                                                                    attributes: {productos: {data: productList}}
                                                                } = item;
                                                                return (
                                                                    <div key={id}
                                                                         className="product-container">
                                                                        <div className="cart-product-container p-4">
                                                                            <div>
                                                                                <img
                                                                                    src={`${productList[0].attributes.imagen.data[0].attributes.url}`}
                                                                                    width={48}
                                                                                    alt={productList[0].attributes.titulo}/>
                                                                            </div>
                                                                            <div className={"product-details"}>
                                                                                <h3 className={"ml-5"}>{productList[0].attributes.titulo}</h3>
                                                                                <p>Categoría: {productList[0]?.attributes?.categorias?.data[0]?.attributes?.nombre}</p>
                                                                            </div>
                                                                            <div className="price">
                                                                                <h1>${productList[0].attributes.precio_unidad.toLocaleString('en-US')}CLP</h1>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <h4 className="text-end mt-4">
                                                            <strong>Total: </strong>${getTotalPrice()}CLP</h4>
                                                    </div>
                                                </div>
                                                <div className="d-grid gap-2 mt-5">
                                                    <button className="btn btn-primary" type="button"
                                                            onClick={handleRedirect}>Seguir comprando
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
}

export async function getServerSideProps() {
    const navbarProps = await GetNavbarProps.getServerSideProps();

    return {
        props: {
            navbarProps: navbarProps.props,
        }
    }
}

export default withRouter(OrderComplete);
