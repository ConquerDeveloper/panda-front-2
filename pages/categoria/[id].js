import React from 'react';
import Header from "../../includes/header";
import Navbar from "../../includes/navbar";
import Sidebar from "../../includes/sidebar";
import Carousel from "../../includes/carousel";
import styles from "../../styles/Home.module.css";
import categoryStyles from "../../styles/Categoria.module.css";
import ReactMarkdown from "react-markdown";
import Footer from "../../includes/footer";
import Constants from "../../constants/Constants";
import ProductCard from "../../includes/product-card";
import Link from "next/link";

export default function Categoria({
  carousel,
  title,
  description,
  products,
  subcategories
}) {

    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar/>

            <main>
                <div>
                    <div className="row">
                        <div className="col-2">
                            <Sidebar headers={["teléfonos", "categorías", "envíos", "pagos", "certificaciones"]}/>
                        </div>
                        <div className="col-8">
                            <div className={"content p-3"}>
                                <Carousel carouselImages={carousel}/>
                            </div>
                            {
                                subcategories && subcategories.length > 0 && subcategories.map((item) => {
                                    const { id, attributes: { titulo, texto, productos:{ data: productsList } } } = item;
                                    return (
                                        <React.Fragment key={id}>
                                            <div className={styles.subtitleLabel}>
                                                <h1>{titulo}</h1>
                                            </div>
                                            <div className={"content"}>
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            productsList.length > 0 && productsList.slice(0, 4).map((item) => {
                                                                return (
                                                                    <div className={`col-4 text-start`} key={item.id}>
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
                                                                    <button type={"button"} className={"btn btn-primary btn-sm shadow-none text-uppercase"}>Ver más &raquo;</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                            {
                                subcategories.length === 0 &&
                                <React.Fragment>
                                    <div className={styles.subtitleLabel}>
                                        <h1>{title}</h1>
                                    </div>
                                    <div className={"content"}>
                                        <div className={categoryStyles.contentContainer}>
                                            <ReactMarkdown>{description}</ReactMarkdown>
                                        </div>
                                        <div className={`container`}>
                                            <div className="row">
                                                {
                                                    products.length > 0 && products.map((item) => {
                                                        return (
                                                            <div className={`col-3 text-start`} key={item.id}>
                                                                <ProductCard productItem={item}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {
                                                !subcategories.length &&
                                                <div className="row mt-4">
                                                    <div className="col-12">
                                                        <div className="text-end">
                                                            <Link href={"/productos"}>
                                                                <button type={"button"} className={"btn btn-primary btn-sm shadow-none text-uppercase"}>Ver más &raquo;</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                        <div className="col-2">
                            <Sidebar headers={["horario", "videos"]}/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${Constants.HOST}/api/categorias`)
    const categories = await res.json()

    const paths = categories.data.map((category) => ({
        params: {id: category.id.toString()},
    }))

    return {paths, fallback: true}
}

export async function getStaticProps({params}) {

    const pageData = await fetch(`${Constants.HOST}/api/categorias/${params.id}?populate[carrusel][populate][0]=carrusel&populate[productos][populate][0]=imagen&populate[productos][populate][1]=categorias&populate[subcategorias][populate][0]=productos.imagen&populate[subcategorias][populate][1]=productos.categorias`);

    const {
        data: {
            attributes: {
                nombre: title,
                descripcion: description,
                carrusel: {data: carousel},
                productos: {data: products},
                subcategorias: {data: subcategories},
            }
        }
    } = await pageData.json();

    return {
        props: {
            carousel,
            title,
            description,
            products,
            subcategories,
        },
    }
}
