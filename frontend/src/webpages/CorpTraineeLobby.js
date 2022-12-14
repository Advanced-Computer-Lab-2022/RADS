import CorpTraineeSearch from "../webcomponents/CorpTraineeSearch";
import CorpTraineePassword from "../webcomponents/CorpTraineePassword";
import AppBar  from "../webcomponents/AppBar";


const CorpTraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;

    return ( 
    <div className = "home-lobby" >
        {/* <AppBar /> */}
        Welcome to RADS Online Course Provider(CorpTraineeLobby side) 
        <CorpTraineeSearch rateVal = { props.rateVal } currencyVal = { props.currencyVal }/> 
        <CorpTraineePassword />
        </div>
    )
}


export default CorpTraineeLobby;