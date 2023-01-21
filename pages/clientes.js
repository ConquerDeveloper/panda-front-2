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

export default function Clientes({
    clientes,
    fotos_clientes,
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
                                <Carousel carouselImages={clientes?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>{clientes.subtitulo}</h1>
                            </div>
                            <div className="content">
                                <div className={whoStyles.title}>
                                    <ReactMarkdown >{clientes.contenido}</ReactMarkdown>
                                </div>
                                <div className="container">
                                    <div className="row mb-4">
                                            {
                                                fotos_clientes.length > 0 && fotos_clientes.map((item) => {
                                                    const { attributes: { nombre_cliente, imagen_url }, id } = item;
                                                    return (
                                                        <div key={id} className="col-4">
                                                            <div className={"text-center my-2"}>
                                                                <img src={`${imagen_url}`} width="150" className={"img-fluid"} alt={nombre_cliente}/>
                                                                <p className={"text-center mt-2"}><strong>{ nombre_cliente }</strong></p>
                                                            </div>
                                                         </div>
                                                    )
                                                })
                                            }
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

    const pageData = await fetch(`${Constants.HOST}/api/cliente?populate[Clientes][populate][0]=carrusel&populate[cliente][populate][0]=foto`)
    const {data: {attributes: {Clientes: clientes, cliente: { data: fotos_clientes }}}} = await pageData.json();

    const sidebarProps = await GetSidebarProps.getServerSideProps();
    const navbarProps = await GetNavbarProps.getServerSideProps();

    return {
        props: {
            clientes,
            fotos_clientes,
            sidebarProps: sidebarProps.props,
            navbarProps: navbarProps.props,
        },
    }
}
