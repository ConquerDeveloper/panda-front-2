import Image from "next/image";
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Constants from "../constants/Constants";
import {useCallback, useEffect, useState} from "react";
import Search from "./search";
import {v4 as uuidv4} from 'uuid';
import homeIcon from '../public/images/inicio.png';
import usIcon from '../public/images/quienes-somos.png';
import clientsIcon from '../public/images/clientes.png';
import questionsIcon from '../public/images/preguntas.png';
import certificatesIcon from '../public/images/certificados.png';
import Router from "next/router";

export default function Navbar() {

    const [logo, setLogo] = useState(null);
    const [cartImage, setCartImage] = useState(null);
    const [cartCount, setCartCount] = useState(null);

    const getLogo = useCallback(async () => {
        const [logoData, cartImageData, cartData] = await Promise.all([
            fetch(`${Constants.HOST}/api/logo?populate=*`),
            fetch(`${Constants.HOST}/api/imagen-carrito`),
            fetch(`${Constants.HOST}/api/carritos?filters[client_id][$eq]=${window.sessionStorage.getItem('client_id')}&filters[comprado][$eq]=${false}`),
        ])
        //const {data: {attributes: {imagen: {data: {attributes: {url: logoUrl}}}}}} = await logoData.json();
        const {data: {attributes: {imagen_url}}} = await logoData.json();
        const {data: {attributes: {imagen_url: cartImageUrl}}} = await cartImageData.json();
        const {data: cartCountData} = await cartData.json();
        setLogo(imagen_url);
        setCartImage(cartImageUrl);
        setCartCount(cartCountData);
    }, []);

    useEffect(() => {
        (async () => await getLogo())();
    }, [getLogo]);

    useEffect(() => {
        if (!window.sessionStorage.getItem('client_id')) {
            sessionStorage.setItem('client_id', uuidv4());
        }
    }, []);

    return (
        <header>
            <div className={styles.headerContainer}>
                <div>
                    <span className={"style-me"}>
                    {
                        logo && <Image src={`${logo}`} className={styles.logo} width={100} height={90}
                                       alt={"Logo"}/>
                    }
                    </span>
                </div>
                <div>
                    <h1>PANDA STORE SPA</h1>
                </div>
                <div style={{height: 100, position: "relative"}}>
                    {
                        cartCount && cartCount.length > 0 &&
                        <div className="carrito-count">
                            {cartCount.length}
                        </div>
                    }
                    <Link href={"/cart"}>
                        <a>
                            {
                                cartImage &&
                                <Image src={`${cartImage}`} className={styles.logo} width={100}
                                       height={60}
                                       alt={"Carrito"}/>
                            }
                        </a>
                    </Link>
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <Link href="/">
                            <a>
                                <Image src={homeIcon} width={20} height={20} alt="Inicio"/>
                                <span>Inicio</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/nosotros">
                            <a>
                                <Image src={usIcon} width={20} height={20} alt="Quiénes somos"/>
                                <span>Quiénes Somos</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/clientes"><a><Image src={clientsIcon} width={20} height={20} alt="Clientes"/>
                            <span>Clientes</span>
                        </a></Link>
                    </li>
                    <li>
                        <Link href="/preguntas"><a><Image src={questionsIcon} width={20} height={20} alt="Preguntas"/>
                            <span>Preguntas Frecuentes</span></a></Link>
                    </li>
                    <li>
                        <Link href="/certificaciones"><a><Image src={certificatesIcon} width={20} height={20}
                                                                alt="Certificaciones"/>
                            <span>Certificaciones</span>
                        </a></Link>
                    </li>
                    <li style={{position: "relative"}}>
                        <Search/>
                    </li>
                </ul>
            </div>
        </header>
    );
}
