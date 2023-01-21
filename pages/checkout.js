import React, {useState, useEffect, useCallback} from "react";
import Header from "../includes/header";
import Navbar from "../includes/navbar";
import styles from "../styles/Home.module.css";
import Constants from "../constants/Constants";
import Footer from "../includes/footer";
import emailTemplate from "../includes/email-template";
import Router from "next/router";
import Link from "next/link";
import GetNavbarProps from "../helpers/GetNavbarProps";

export default function Checkout({navbarProps}) {

    const [buyerName, setBuyerName] = useState("");
    const [buyerLastName, setBuyerLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [cartList, setCartList] = useState([]);
    // const router = useRouter();

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

    const handleSubmit = async (e) => {
        setIsLoading(true);
        if (e) {
            e.preventDefault();
        }
        setIsLoading(false);
        handleClearCart().then(response => {
            Router.push({
                pathname: "/order-complete",
                query: JSON.stringify(cartList),
                email
            });
        }).catch(e => {
            console.log("error", e);
        });
    };

    const handleClearCart = async () => {
        try {
            const cartRequest = await fetch(`${Constants.HOST}/api/carritos`);
            if (cartRequest.status === 200) {
                const {data: cartList} = await cartRequest.json();
                cartList.map(async (item) => {
                    const request = await fetch(`${Constants.HOST}/api/carritos/${item.id}`, {
                        headers: {
                            Accept: "*/*",
                            "Content-Type": "application/json"
                        },
                        method: "PUT",
                        body: JSON.stringify({
                            data: {
                                comprado: true
                            }
                        })
                    });
                });
            }
        } catch (err) {
            console.error(err);
        }
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
                ...navbarProps
            }} />
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
                                        <div className="col-8">
                                            <form onSubmit={handleSubmit}>
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <h5 className="text-uppercase"><strong>Detalles de
                                                            facturación</strong></h5>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label>Nombres:</label>
                                                                <input type="text" className="form-control"
                                                                       value={buyerName}
                                                                       onChange={(e) => setBuyerName(e.target.value)}
                                                                       required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label>Apellidos:</label>
                                                                <input type="text" className="form-control"
                                                                       value={buyerLastName}
                                                                       onChange={(e) => setBuyerLastName(e.target.value)}
                                                                       required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label>Nombre de la empresa (opcional):</label>
                                                                <input type="text" className="form-control"
                                                                       value={companyName}
                                                                       onChange={e => setCompanyName(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label>Región:</label>
                                                                <input type="text" className="form-control"
                                                                       value={region}
                                                                       onChange={e => setRegion(e.target.value)}
                                                                       required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label>Localidad / Ciudad:</label>
                                                                <input type="text" className="form-control" value={city}
                                                                       onChange={e => setCity(e.target.value)}
                                                                       required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label>Teléfono:</label>
                                                                <input type="text" className="form-control"
                                                                       value={phone}
                                                                       onChange={e => setPhone(e.target.value)}
                                                                       required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Dirección completa:</label>
                                                        <input type="text" className="form-control" value={fullAddress}
                                                               onChange={e => setFullAddress(e.target.value)} required/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Correo electrónico:</label>
                                                        <input type="email" className="form-control" value={email}
                                                               onChange={e => setEmail(e.target.value)} required/>
                                                    </div>
                                                </div>

                                                <div className="row mt-4">
                                                    <div className="col-12">
                                                        {
                                                            cartList.length > 0 && cartList.map((item) => {
                                                                const {
                                                                    id,
                                                                    attributes: {productos: {data: productList}}
                                                                } = item;
                                                                return (
                                                                    <div key={id}
                                                                         className="col-12 product-container content">
                                                                        <div className="cart-product-container p-4">
                                                                            <div className={"product-preview-container"}>
                                                                                <div>
                                                                                    <img
                                                                                        src={`${productList[0].attributes.imagen.data[0].attributes.url}`}
                                                                                        width={48}
                                                                                        alt={productList[0].attributes.titulo}/>
                                                                                </div>
                                                                                <div className={"product-details"}>
                                                                                    <Link
                                                                                        href={`/productos/${productList[0].id}`}>
                                                                                        <a>
                                                                                            <h3 className={"ml-5"}>{productList[0].attributes.titulo}</h3>
                                                                                        </a>
                                                                                    </Link>
                                                                                    <p>Categoría: {productList[0]?.attributes?.categorias?.data[0]?.attributes?.nombre}</p>
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
                                                </div>

                                                <div className="row my-5">
                                                    <div className="col-12">
                                                        <h5>Medios de pago:</h5>
                                                        <div className="disclaimer-text">
                                                            <p>Actualmente nos encontramos trabajando en el carro de
                                                                compras de nuestro sitio web, por esta razón, las
                                                                solicitudes se realizarán mediante el contacto directo
                                                                con nuestro equipo de ventas. Contamos con distintos
                                                                medios de pago, como: transferencia, debito y credito a
                                                                través de sistema webpay. Uno de nuestros agentes se
                                                                comunicara con usted a la brevedad para finalizar su
                                                                compra.</p>
                                                        </div>
                                                        <hr/>
                                                    </div>
                                                    <div className="text-end">
                                                        <button className="btn btn-primary" type="submit"
                                                                disabled={isLoading}>{isLoading ? 'Espere...' : 'Comprar'}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-4">
                                            <div className="content">
                                                <p><strong>Resumen de compra</strong></p>
                                                <hr/>
                                                <div className={"checkout-summary"}>
                                                    <p>Productos: ({cartList.length})</p>
                                                    <p>${getTotalPrice()}CLP</p>
                                                </div>
                                                <hr/>
                                                <div className={"checkout-summary"}>
                                                    <p><strong>Total:</strong></p>
                                                    <p>${getTotalPrice()}CLP</p>
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
    );
}

export async function getServerSideProps() {
    const pageData = await fetch(`${Constants.HOST}/api/carritos?populate[productos][populate][0]=imagen&populate[productos][populate][1]=categorias`)
    const {data: cartList} = await pageData.json();
    const navbarProps = await GetNavbarProps.getServerSideProps();
    return {
        props: {
            cartList,
            navbarProps: navbarProps.props,
        },
    }
}
