import React, {useCallback, useEffect, useState} from 'react';
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Constants from "../constants/Constants";
import youtubeLogo from '../public/images/youtube-logo.webp';
import Image from "next/image";

export default function SidebarRight({
 sidebarProps
}) {

    return (
        <aside className={"sidebar"}>
            <section>
                <header>
                    <h1>Horario</h1>
                </header>
                <main>
                    <div className="text-center">
                        <ReactMarkdown>{sidebarProps?.scheduleObject?.attributes?.horarios}</ReactMarkdown>
                    </div>
                </main>
            </section>
            <section>
                <header>
                    <h1>Encuéntranos en</h1>
                </header>
                <main>
                    {
                        <div key={sidebarProps?.findUsInfo?.id} className="text-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Image src={`${sidebarProps?.findUsInfo?.attributes?.imagen_url}`}
                                   loading="eager"
                                   alt={"encuentranos"}
                                   width={150}
                                   height={60}
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
                        sidebarProps?.videosList?.length > 0 && sidebarProps?.videosList.slice(0, 7).map((item) => (
                            <React.Fragment key={item.id}>
                                <div className="video-block-container">
                                    <div className={"video-container"}>
                                        <Link href="/pruebas-balisticas">
                                            <a rel={"noreferrer"}>
                                                <div className="opacity"></div>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <div style={{width: 165, height: 82, position: 'relative'}}>
                                                    <Image src={`${item.attributes.imagen_url}`}
                                                           loading="eager"
                                                           layout="fill"
                                                           objectFit="contain"
                                                           alt="Antibalas"/>
                                                </div>
                                                <div className={"youtubeButton"}>
                                                    <Image src={youtubeLogo} width={60} height={40} loading="eager" alt=""/>
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
    );
}

//        width={150}
//                                                            height={80}
