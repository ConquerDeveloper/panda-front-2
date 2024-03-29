import React from "react";
import Header from "../includes/header";
import Navbar from "../includes/navbar";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import styles from "../styles/Home.module.css";
import whoStyles from "../styles/Nosotros.module.css";
import Carousel from "../includes/carousel";
import ReactMarkdown from "react-markdown";
import Constants from "../constants/Constants";
import GetSidebarProps from "../helpers/GetSidebarProps";
import GetNavbarProps from "../helpers/GetNavbarProps";
import SidebarRight from "../includes/sidebarRight";

export default function Nosotros({nosotros, sidebarProps, navbarProps}) {
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
                            <div className={"content p-3"}>
                               <Carousel carouselImages={nosotros?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>{nosotros.subtitulo}</h1>
                            </div>
                            <div className={"content"}>
                                <div className={whoStyles.title}>
                                    <ReactMarkdown >{nosotros.contenido}</ReactMarkdown>
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

    const pageData = await fetch(`${Constants.HOST}/api/quien?populate[nosotros][populate][0]=carrusel`)
    const {data: {attributes: {nosotros}}} = await pageData.json();

    const sidebarProps = await GetSidebarProps.getServerSideProps();
    const navbarProps = await GetNavbarProps.getServerSideProps();

    return {
        props: {
            nosotros,
            sidebarProps: sidebarProps.props,
            navbarProps: navbarProps.props,
        },
    }
}
