import React, {useCallback, useEffect, useState} from 'react';
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Constants from "../constants/Constants";
import youtubeLogo from '../public/images/youtube-logo.webp';
import Image from "next/image";

export default function Sidebar({
    headers,
    hydration
}) {

    const [categories, setCategories] = useState([]);
    const [phones, setPhones] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [shipment, setShipment] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [payments, setPayments] = useState([]);
    const [videos, setVideos] = useState([]);
    const [findUs, setFindUs] = useState(null);

    const populateSidebar = useCallback(async () => {
        const [phoneData, categoriesData, scheduleData, shipmentData, certificationsData, paymentsData, videosData, findUsData] = await Promise.all([
            fetch(`${Constants.HOST}/api/telefono`),
            fetch(`${Constants.HOST}/api/categorias?populate=subcategorias`),
            fetch(`${Constants.HOST}/api/horario`),
            fetch(`${Constants.HOST}/api/envios`),
            fetch(`${Constants.HOST}/api/certificaciones`),
            fetch(`${Constants.HOST}/api/pagos`),
            fetch(`${Constants.HOST}/api/videos`),
            fetch(`${Constants.HOST}/api/encuentra`),
        ]);
        const {data: phonesObject} = await phoneData.json();
        const {data: categoriesList} = await categoriesData.json();
        const {data: scheduleObject} = await scheduleData.json();
        const {data: shipmentList} = await shipmentData.json();
        const {data: certificationsList} = await certificationsData.json();
        const {data: paymentsList} = await paymentsData.json();
        const {data: videosList} = await videosData.json();
        const {data: findUsInfo} = await findUsData.json();
        setCategories(categoriesList);
        setPhones(phonesObject);
        setSchedule(scheduleObject);
        setShipment(shipmentList);
        setCertifications(certificationsList);
        setPayments(paymentsList);
        setVideos(videosList);
        setFindUs(findUsInfo);
    }, []);

    useEffect(() => {
        (async () => await populateSidebar())();
    }, [populateSidebar]);

    if (headers.length > 2) {
        return (
            <aside className={"sidebar"}>
                <section>
                    <header>
                        <h1>Teléfonos</h1>
                    </header>
                    <main>
                        <ReactMarkdown>{hydration?.phone?.attributes?.telefonos}</ReactMarkdown>
                    </main>
                </section>
                <section>
                    <header>
                        <h1>Categorías</h1>
                    </header>
                    <main>
                        <ul>
                            {
                                categories.length > 0 && categories.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={`/categoria/${encodeURIComponent(item.id)}`}><a>{item.attributes.nombre}</a></Link>
                                        <div className="subcategory">
                                            {
                                                item.attributes.subcategorias?.data.length > 0 && item.attributes.subcategorias?.data.map((subcategory) => (
                                                    <li key={subcategory.id}>
                                                        <span>{subcategory.attributes.texto}</span>
                                                    </li>
                                                ))
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </main>
                </section>
                <section>
                    <header>
                        <h1>Envíos</h1>
                    </header>
                    <main>
                        {
                            shipment.length > 0 && shipment.map((item) => (
                                <div key={item.id} className="text-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`${item.attributes.imagen_url}`}
                                         width={"150"}
                                    />
                                </div>
                            ))
                        }
                    </main>
                </section>
                <section>
                    <header>
                        <h1>Pagos</h1>
                    </header>
                    <main>
                        {
                            payments.length > 0 && payments.map((item) => (
                                <React.Fragment key={item.id}>
                                    <div className={'text-center'}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`${item.attributes.imagen_url}`} width={150}
                                        />
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </main>
                </section>
                <section>
                    <header>
                        <h1>Certificaciones</h1>
                    </header>
                    <main>
                        {
                            certifications.length > 0 && certifications.map((item) => (
                                <React.Fragment key={item.id}>
                                    <div className={'text-center'}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`${item.attributes.imagen_url}`} width={150}
                                        />
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </main>
                </section>
            </aside>
        );
    } else {
        return (
            <aside className={"sidebar"}>
                <section>
                    <header>
                        <h1>Horario</h1>
                    </header>
                    <main>
                        <div className="text-center">
                            <ReactMarkdown>{schedule?.attributes?.horarios}</ReactMarkdown>
                        </div>
                    </main>
                </section>
                <section>
                    <header>
                        <h1>Encuéntranos en</h1>
                    </header>
                    <main>
                        {
                            <div key={findUs?.id} className="text-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`${findUs?.attributes?.imagen_url}`}
                                     width={"150"}
                                />
                            </div>
                        }
                    </main>
                </section>
                <section>
                    <header>
                        <h1>Pruebas balísticas</h1>
                    </header>
                    <main>
                        {
                            videos.length > 0 && videos.slice(0, 7).map((item) => (
                                <React.Fragment key={item.id}>
                                    <div className="video-block-container">
                                        <div className={"video-container"}>
                                            <Link href="/pruebas-balisticas">
                                                <a rel={"noreferrer"}>
                                                    <div className="opacity"></div>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={`${item.attributes.imagen_url}`}
                                                         className={"img-fluid"}
                                                         alt="Antibalas"/>
                                                    <div className={"youtubeButton"}>
                                                        <Image src={youtubeLogo} width={60} height={40} alt=""/>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        <p><strong>{item.attributes.titulo}</strong></p>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </main>
                </section>
            </aside>
        )
    }
}
