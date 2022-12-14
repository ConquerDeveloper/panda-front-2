import React, {useState, useEffect, useCallback} from "react";
import Constants from "../../constants/Constants";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function Footer() {

    const [location, setLocation] = useState("");
    const [schedule, setSchedule] = useState("");
    const [contactUs, setContactUs] = useState("");
    const [socials, setSocials] = useState([]);

    const getFooterData = useCallback(async () => {
        const [locationData, attentionScheduleData, contactUsData, socialNetworkData] = await Promise.all([
            fetch(`${Constants.HOST}/api/ubicacion`),
            fetch(`${Constants.HOST}/api/horario-pie-de-pagina`),
            fetch(`${Constants.HOST}/api/contacto`),
            fetch(`${Constants.HOST}/api/redes-sociales?populate=*`)
        ]);
        const {data: {attributes: {contenido}}} = await locationData.json();
        const {data: {attributes: {horario}}} = await attentionScheduleData.json();
        const {data: {attributes: {contenido: contactUsContent}}} = await contactUsData.json();
        const {data: socialsList} = await socialNetworkData.json();
        setLocation(contenido);
        setSchedule(horario);
        setContactUs(contactUsContent);
        setSocials(socialsList);
    }, []);

    useEffect(() => {
        (async () => await getFooterData())();
    }, [getFooterData]);

    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h5 className={"subtitle"}>Ubicación:</h5>
                        <ReactMarkdown>{location}</ReactMarkdown>
                        <h5 className={"subtitle"}>Horario:</h5>
                        <ReactMarkdown>{schedule}</ReactMarkdown>
                    </div>
                    <div className="col-3">
                        <h5 className="subtitle">Contáctenos</h5>
                        <ReactMarkdown>{contactUs}</ReactMarkdown>
                        <Link href={"/despachos"}>
                            <a>
                                <h5 className="subtitle">Despachos y garantías</h5>
                            </a>
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link href={"/privacidad"}>
                            <a>
                                <h5 className="subtitle mb-5">Privacidad</h5>
                            </a>
                        </Link>
                        <Link href={"/politica"}>
                            <a>
                                <h5 className="subtitle">Políticas de atención</h5>
                            </a>
                        </Link>
                    </div>
                    <div className="col-3">
                        <h5 className="subtitle">Síguenos</h5>
                        <ul className="social-networks">
                            {
                                socials.length > 0 && socials.map((item) => {
                                    return <li key={item.id}>
                                        <Link href={item?.attributes?.link}>
                                            <a>
                                                <img src={`${Constants.HOST}${item?.attributes?.icono?.data?.attributes?.url}`} width={20} alt={item.nombre}/>
                                            </a>
                                        </Link>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
