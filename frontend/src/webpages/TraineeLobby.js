import TraineePassword from "../webcomponents/TraineePassword";
import TraineeSearch from "../webcomponents/TraineeSearch";
import TraineeCreditCard from "../webcomponents/TraineeCreditCard";


const TraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;

    return ( 
       <div className = "home-lobby" >
        Welcome to RADS Online Course Provider(TraineeLobby side) 
        <TraineeSearch rateVal = {props.rateVal} currencyVal = {props.currencyVal}/>
        <TraineePassword />
        </div>
    )
}


export default TraineeLobby;