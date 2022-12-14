import Header from "../includes/header";
import Navbar from "../includes/navbar";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import styles from "../styles/Home.module.css";
import Carousel from "../includes/carousel";
import whoStyles from "../styles/Nosotros.module.css";
import ReactMarkdown from "react-markdown";
import Constants from "../constants/Constants";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import imageSource from "../public/images/pdf-icon.png";

export default function Certificaciones({content, documents}) {

    const [numPages, setDocumentNumPages] = useState(null);

    const onLoadSuccessPdf = ({numPages}) => setDocumentNumPages(numPages);

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
                                <Carousel carouselImages={content?.carrusel?.data}/>
                            </div>
                            <div className={styles.subtitleLabel}>
                                <h1>{content.subtitulo}</h1>
                            </div>
                            <div className="content">
                                <div className={whoStyles.title}>
                                    <ReactMarkdown>{content.contenido}</ReactMarkdown>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        {
                                            documents.length && documents.map((item) => {
                                                const {
                                                    id,
                                                    attributes: {titulo: title, documento: {data: documentInfo}}
                                                } = item;
                                                console.log('url', `${Constants.HOST}${documentInfo?.attributes?.url}`);
                                                return (
                                                    <div key={id} className="col-4 pdf-container my-4">
                                                        <Link href={`${Constants.HOST}${documentInfo?.attributes?.url}`}>
                                                            <a target={"_blank"}>
                                                                <div className={"text-center"}>
                                                                    <Image src={imageSource} width={100} height={100}
                                                                           alt="Pdf Icon"/>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                        <h5 className="text-center">{title}</h5>
                                                    </div>
                                                )
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
    const [certifications, documentData] = await Promise.all([
        fetch(`${Constants.HOST}/api/ceriticaciones-pagina?populate[certificaciones][populate][0]=carrusel`),
        fetch(`${Constants.HOST}/api/certificaciones-pdfs?populate=*`)
    ]);
    const {data: {attributes: {certificaciones: content}}} = await certifications.json();
    const {data: documents} = await documentData.json();

    return {
        props: {
            content,
            documents
        }
    }
}
