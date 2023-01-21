import Header from "../includes/header";
import Navbar from "../includes/navbar";
import Sidebar from "../includes/sidebar";
import styles from "../styles/Home.module.css";
import Carousel from "../includes/carousel";
import whoStyles from "../styles/Nosotros.module.css";
import ReactMarkdown from "react-markdown";
import Constants from "../constants/Constants";
import Footer from "../includes/footer";
import GetSidebarProps from "../helpers/GetSidebarProps";
import GetNavbarProps from "../helpers/GetNavbarProps";
import SidebarRight from "../includes/sidebarRight";

export default function Privacidad({
 privacidad,
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
                                <Carousel carouselImages={privacidad?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>{privacidad.subtitulo}</h1>
                            </div>
                            <div className="content">
                                <div className={whoStyles.title}>
                                    <ReactMarkdown >{privacidad.contenido}</ReactMarkdown>
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

    const pageData = await fetch(`${Constants.HOST}/api/privacidad?populate[pagina][populate][0]=carrusel`)
    const {data: {attributes: {pagina: privacidad }}} = await pageData.json();
    const sidebarProps = await GetSidebarProps.getServerSideProps();
    const navbarProps = await GetNavbarProps.getServerSideProps();
    return {
        props: {
            privacidad,
            sidebarProps: sidebarProps.props,
            navbarProps: navbarProps.props,
        },
    }
}
