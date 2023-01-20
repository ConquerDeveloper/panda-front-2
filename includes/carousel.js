import Constants from "../constants/Constants";

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
                                    <img
                                        src={`${Constants.HOST}${item.attributes.url}`}
                                        alt={item.attributes.name}
                                        className="d-block w-100"/>
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
            <img
                src={`${Constants.HOST}${carouselImages[0].attributes.url}`}
                alt={carouselImages[0].attributes.name}
                className="d-block w-100"/>
        )
    }
    if (!carouselImages?.length) {
        return null;
    }

}
