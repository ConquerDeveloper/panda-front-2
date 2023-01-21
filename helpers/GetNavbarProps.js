import Constants from "../constants/Constants";

function GetNavbarProps(props) {
    return props;
}

GetNavbarProps.getServerSideProps = async function (context) {

    const [logoData, cartImageData] = await Promise.all([
        fetch(`${Constants.HOST}/api/logo?populate=*`),
        fetch(`${Constants.HOST}/api/imagen-carrito`),
    ]);
    const {data: {attributes: {imagen_url: logo}}} = await logoData.json();
    const {data: {attributes: {imagen_url: cartImage}}} = await cartImageData.json();

    return {
        props: {
            logo,
            cartImage,
        }
    }
};

export default GetNavbarProps;
