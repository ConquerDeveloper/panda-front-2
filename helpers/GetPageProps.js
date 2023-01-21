import Constants from "../constants/Constants";

function GetPageProps(props) {
    return props;
}

GetPageProps.getServerSideProps = async function (context) {
    const phoneData = await fetch(`${Constants.HOST}/api/telefono`);
    const {data: phone} = await phoneData.json();
    return {
        props: {
            phone,
        }
    }
};

export default GetPageProps;
