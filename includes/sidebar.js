import React, {useCallback, useEffect, useState} from 'react';
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Constants from "../constants/Constants";
import youtubeLogo from '../public/images/youtube-logo.webp';
import Image from "next/image";

export default function Sidebar({
 sidebarProps
}) {
    return (
        <aside className={"sidebar"}>
            <section>
                <header>
                    <h1>Teléfonos</h1>
                </header>
                <main>
                    <ReactMarkdown>{sidebarProps?.phone?.attributes?.telefonos}</ReactMarkdown>
                </main>
            </section>
            <section>
                <header>
                    <h1>Categorías</h1>
                </header>
                <main>
                    <ul>
                        {
                            sidebarProps?.categoriesList.length > 0 && sidebarProps?.categoriesList.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/categoria/${encodeURIComponent(item.id)}`}><a>{item.attributes.nombre}</a></Link>
                                    <span className="subcategory">
                                            {
                                                item.attributes.subcategorias?.data.length > 0 && item.attributes.subcategorias?.data.map((subcategory) => (
                                                    <span key={subcategory.id} role="list">
                                                        <span>{subcategory.attributes.texto}</span>
                                                    </span>
                                                ))
                                            }
                                        </span>
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
                        sidebarProps?.shipmentList?.length > 0 && sidebarProps?.shipmentList.map((item) => (
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
                        sidebarProps?.paymentsList?.length > 0 && sidebarProps?.paymentsList.map((item) => (
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
                        sidebarProps?.certificationsList?.length > 0 && sidebarProps?.certificationsList.map((item) => (
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
}
