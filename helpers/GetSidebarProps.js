import Constants from "../constants/Constants";

function GetSidebarProps(props) {
    return props;
}

GetSidebarProps.getServerSideProps = async function (context) {

    const [phoneData, categoriesData, scheduleData, shipmentData, certificationsData, paymentsData, videosData, findUsData] = await Promise.all([
        fetch(`${Constants.HOST}/api/telefono`),
        fetch(`${Constants.HOST}/api/categorias?populate=subcategorias`),
        fetch(`${Constants.HOST}/api/horario`),
        fetch(`${Constants.HOST}/api/envios`),
        fetch(`${Constants.HOST}/api/certificaciones`),
        fetch(`${Constants.HOST}/api/pagos`),
        fetch(`${Constants.HOST}/api/videos`),
        fetch(`${Constants.HOST}/api/encuentra`),
    ])

    const {data: phone} = await phoneData.json();
    const {data: categoriesList} = await categoriesData.json();
    const {data: scheduleObject} = await scheduleData.json();
    const {data: shipmentList} = await shipmentData.json();
    const {data: certificationsList} = await certificationsData.json();
    const {data: paymentsList} = await paymentsData.json();
    const {data: videosList} = await videosData.json();
    const {data: findUsInfo} = await findUsData.json();
    return {
        props: {
            phone,
            categoriesList,
            scheduleObject,
            shipmentList,
            certificationsList,
            paymentsList,
            videosList,
            findUsInfo,
        }
    }
};

export default GetSidebarProps;
