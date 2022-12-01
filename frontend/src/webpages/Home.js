import HomeSearch from "../webcomponents/HomeSearch";

const Home = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    return (
                     <div>
            <HomeSearch rateVal = {props.rateVal} currencyVal={props.currencyVal}/>
        </div>
    )
}

export default Home;