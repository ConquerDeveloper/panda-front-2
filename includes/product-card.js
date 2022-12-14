import React from 'react';
import Constants from "../constants/Constants";
import Link from "next/link";

export default function ProductCard({productItem}) {
    const {
        id,
        attributes: {
            titulo: title,
            precio_unidad: price,
            imagen: {data: imagen},
            categorias: {data: category}
        }
    } = productItem;
    const isExternalUrl = false;
    const imageUrl = imagen[0].attributes.url;
    return (
        <div className={"product-card"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isExternalUrl ? imageUrl : `${Constants.HOST}${imageUrl}`}
                 className={"img-fluid"}
                 alt={title}
            />
            {
               category.length > 0 && category.map((item) => (
                    <p key={item.id} className={"text-muted mb-0 text-start category"}>{item.attributes.nombre}</p>
                ))
            }
            <h5 className={"text-start title mt-2"}>{title}</h5>
            <p className={"text-start price"}>{`CLP $${parseFloat(price).toFixed(3)}`}</p>
            <div className="text-start mt-2">
                <Link href={`/productos/${id}`}>
                    <button type={"button"} className={"btn btn-primary btn-sm shadow-none"}>Leer más</button>
                </Link>
            </div>
        </div>
    );
}
