import React from "react";
import Navbar from "../includes/navbar";
import Header from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import styles from "../styles/Home.module.css"
import Carousel from "../includes/carousel";
import Constants from "../constants/Constants";
import ProductCard from "../includes/product-card";
import Link from "next/link";
import GetPageProps from "../helpers/GetPageProps";

export default function Home({content, products, otherProps}) {
    const productosDestacados = products.length > 0 && products.filter((item) => item.attributes.destacado);

    console.log('otherProps', otherProps);

    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar/>

            <main>
                <div>
                    <div className="row">
                        <div className="col-2">
                            <Sidebar headers={["teléfonos", "categorías", "envíos", "pagos", "certificaciones"]}
                                     hydration={{
                                         ...otherProps
                                     }}
                            />
                        </div>
                        <div className="col-8">
                            <div className={"content p-3"}>
                                <Carousel carouselImages={content?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>Ofertas del mes</h1>
                            </div>
                            <div className={"content py-5"}>
                                <div className="container">
                                    <div className="row">
                                        {
                                            products?.length > 0 && products.slice(0, 9).map((item) => {
                                                return (
                                                    <div className={`col-4 my-3`} key={item.id}>
                                                        <ProductCard productItem={item}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <div className="text-end">
                                                <Link href={"/productos"}>
                                                    <button type={"button"}
                                                            className={"btn btn-primary btn-sm shadow-none text-uppercase"}>Ver
                                                        más &raquo;</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                productosDestacados.length > 0 &&
                                <>
                                    <div className={styles.subtitleLabel}>
                                        <h1>Productos destacados</h1>
                                    </div>
                                    <div className={"content py-5"}>
                                        <div className="container">
                                            <div className="row">
                                                {
                                                    productosDestacados.slice(0, 9).map((item) => {
                                                        return (
                                                            <div className={`col-4 my-3`} key={item.id}>
                                                                <ProductCard productItem={item}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-12">
                                                    <div className="text-end">
                                                        <Link href={"/productos"}>
                                                            <button type={"button"}
                                                                    className={"btn btn-primary btn-sm shadow-none text-uppercase"}>Ver
                                                                más &raquo;</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="col-2">
                            <Sidebar headers={["horario", "videos"]}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    )
}

export async function getServerSideProps() {
    const [homeData, productData] = await Promise.all([
        fetch(`${Constants.HOST}/api/inicio?populate[inicio][populate][0]=carrusel`),
        fetch(`${Constants.HOST}/api/productos?populate[imagen][populate][0]=imagen&populate[categorias][populate][0]=categorias`),
    ]);

    const {data: {attributes: {inicio: content}}} = await homeData.json();
    const {data: products} = await productData.json();

    const otherProps = await GetPageProps.getServerSideProps();

    return {
        props: {
            content,
            products,
            otherProps: otherProps.props
        }
    }
}
