import Constants from "../constants/Constants";
import Image from "next/image";

export default function Carousel({carouselImages = []}) {

    if (carouselImages?.length > 1) {
        return (
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                        carouselImages.map((item, index) => (
                            <div key={item.id}>
                                <div className={`carousel-item ${index === 0 && "active"}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <div style={{width: '100%', height: 450, position: 'relative'}}>
                                        <Image
                                            src={`${item.attributes.url}`}
                                            layout="fill"
                                            objectFit="contain"
                                            priority
                                            alt={item.attributes.name}
                                            className="d-block w-100"/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <button className="carousel-control-prev" type="button"
                        data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                        data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        );
    }
    if (carouselImages?.length === 1) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <div style={{width: '100%', height: 450, position: 'relative'}}>
                <Image
                    layout="fill"
                    objectFit="contain"
                    priority
                    src={`${carouselImages[0].attributes.url}`}
                    alt={carouselImages[0].attributes.name}
                    className="d-block w-100"/>
            </div>
        )
    }
    if (carouselImages?.length === 0) {
        return null;
    }

}
