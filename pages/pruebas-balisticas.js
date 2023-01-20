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

export default function PruebasBalisticas({
 pruebasBalisticas,
 videosList
}) {
    console.log('videosList', videosList);
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
                                                <div className="video-block-container">
                                                    <div className="video-container">
                                                        <a href={item.attributes.link} target={"_blank"} rel={"noreferrer"}>
                                                            <div className="opacity"></div>
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={`${item.attributes.imagen_url}`}
                                                                 className={"img-fluid"}
                                                                 alt="Antibalas"/>
                                                            <div className={"youtubeButton"}>
                                                                <Image src={youtubeLogo} width={60} height={40} alt=""/>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <p><strong>{item.attributes.titulo}</strong></p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
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

export async function getServerSideProps() {
    const [pruebasBalisticasData, videosData] = await Promise.all([
        fetch(`${Constants.HOST}/api/prueba-balistica?populate[sitio][populate][0]=carrusel`),
        fetch(`${Constants.HOST}/api/videos`)
    ]);
    const {data: {attributes: {sitio: pruebasBalisticas}}} = await pruebasBalisticasData.json();
    const {data: videosList} = await videosData.json();

    return {
        props: {
            pruebasBalisticas,
            videosList
        },
    }
}
