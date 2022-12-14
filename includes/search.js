import React, {useState} from "react";
import Constants from "../constants/Constants";
import Link from "next/link";

export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false);

    const searchProducts = async ({target: {value}}) => {
        try {
            if (value === "") {
                setSearchDropdownVisible(false);
            } else {
                const result = await fetch(`${Constants.HOST}/api/productos?populate=*&filters[titulo][$contains]=${value}`);
                if (result.status === 200) {
                    const {data} = await result.json();
                    setSearchResult(data);
                    setSearchDropdownVisible(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <React.Fragment>
            <input type="text" className="form-control search-input" onKeyUp={searchProducts}
                   placeholder={"Buscar..."}/>
            {
                isSearchDropdownVisible &&
                <div className="search-result">
                    {
                        searchResult.length > 0 && searchResult.map((item) => {
                            const {attributes: {titulo, imagen: {data: image}}, id} = item;
                            return (
                                <div key={id}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`${Constants.HOST}${image[0].attributes.url}`} width={20}
                                         alt={titulo}/>
                                    <Link href={`/productos/${id}`}>
                                        <a>{titulo}</a>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                isSearchDropdownVisible && searchResult.length === 0 &&
                <div className="search-result">
                    <div>
                        <span>No hay resultados para esta bùsqueda</span>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
