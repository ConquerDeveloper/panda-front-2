import Header from "../includes/header";
import Navbar from "../includes/navbar";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import styles from "../styles/Home.module.css";
import Carousel from "../includes/carousel";
import Constants from "../constants/Constants";
import whoStyles from "../styles/Nosotros.module.css";
import ReactMarkdown from "react-markdown";
import GetSidebarProps from "../helpers/GetSidebarProps";
import GetNavbarProps from "../helpers/GetNavbarProps";
import SidebarRight from "../includes/sidebarRight";

export default function Preguntas({
                                      preguntas,
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
                                <Carousel carouselImages={preguntas?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>{preguntas.subtitulo}</h1>
                            </div>
                            <div className="content">
                                <div className={whoStyles.title}>
                                    <ReactMarkdown >{preguntas.contenido}</ReactMarkdown>
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
    const pageData = await fetch(`${Constants.HOST}/api/pregunta?populate[preguntas][populate][0]=carrusel`);
    const {data: {attributes: {preguntas}}} = await pageData.json();

    const sidebarProps = await GetSidebarProps.getServerSideProps();
    const navbarProps = await GetNavbarProps.getServerSideProps();

    return {
        props: {
            preguntas,
            sidebarProps: sidebarProps.props,
            navbarProps: navbarProps.props,
        },
    }
}
