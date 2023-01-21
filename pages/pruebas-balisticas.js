import Header from "../includes/header";
import Navbar from "../includes/navbar";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import styles from "../styles/Home.module.css";
import Carousel from "../includes/carousel";
import Constants from "../constants/Constants";
import whoStyles from "../styles/Nosotros.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import youtubeLogo from "../public/images/youtube-logo.webp";
import Link from "next/link";
import GetSidebarProps from "../helpers/GetSidebarProps";
import GetNavbarProps from "../helpers/GetNavbarProps";
import SidebarRight from "../includes/sidebarRight";

export default function PruebasBalisticas({
                                              pruebasBalisticas,
                                              videosList,
                                              sidebarProps,
                                              navbarProps,
                                          }) {
    return (
        <div className={"page-container"}>
            <Header/>
            <Navbar navbarProps={{
                ...navbarProps
            }} />


            <main>
                <div>
                    <div className="row">
                        <div className="col-2">
                            <Sidebar sidebarProps={{
                                ...sidebarProps
                            }}
                            />
                        </div>
                        <div className="col-8">
                            <div className={`${styles.content} content p-3`}>
                                <Carousel carouselImages={pruebasBalisticas?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>{pruebasBalisticas.subtitulo}</h1>
                            </div>
                            <div className="content">
                                <div className={whoStyles.title}>
                                    <ReactMarkdown>{pruebasBalisticas.contenido}</ReactMarkdown>
                                </div>
                                <div className="container">
                                    <div className="row mb-4">
                                        {
                                            videosList.length > 0 && videosList.map((item) => {
                                                return (
                                                    <div key={item.id} className="col-4">
                                                        <div className="video-block-container">
                                                            <div className="video-container">
                                                                <a href={item.attributes.link} target={"_blank"}
                                                                   rel={"noreferrer"}>
                                                                    <div className="opacity"></div>
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <img src={`${item.attributes.imagen_url}`}
                                                                         className={"img-fluid"}
                                                                         alt="Antibalas"/>
                                                                    <div className={"youtubeButton"}>
                                                                        <Image src={youtubeLogo} width={60} height={40}
                                                                               alt=""/>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <p><strong>{item.attributes.titulo}</strong></p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="container-fluid d-flex h-100">
                                    <div className="row justify-content-center align-self-center">
                                        <div className="col-6">
                                            <Link href={`${pruebasBalisticas?.link_imagen_pie_de_pagina}`}>
                                                <a target="_blank">
                                                    <img src={pruebasBalisticas?.imagen_pie_de_pagina?.data?.attributes?.url} width={150} alt=""/>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="col-6">
                                            <h1><strong><i>{pruebasBalisticas.texto_pie_de_pagina}</i></strong></h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <SidebarRight sidebarProps={{
                                ...sidebarProps
                            }}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export async function getServerSideProps() {
    const [pruebasBalisticasData, videosData] = await Promise.all([
        fetch(`${Constants.HOST}/api/prueba-balistica?populate[sitio][populate][0]=carrusel&populate[sitio][populate][1]=imagen_pie_de_pagina`),
        fetch(`${Constants.HOST}/api/videos`)
    ]);
    const {data: {attributes: {sitio: pruebasBalisticas}}} = await pruebasBalisticasData.json();
    const {data: videosList} = await videosData.json();

    const sidebarProps = await GetSidebarProps.getServerSideProps();
    const navbarProps = await GetNavbarProps.getServerSideProps();

    return {
        props: {
            pruebasBalisticas,
            videosList,
            sidebarProps: sidebarProps.props,
            navbarProps: navbarProps.props,
        },
    }
}
