import TraineePassword from "../webcomponents/TraineePassword";
import TraineeSearch from "../webcomponents/TraineeSearch";
import TraineeCreditCard from "../webcomponents/TraineeCreditCard";

const TraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;

    return (
        <div className="home-lobby" >
            Welcome to RADS Online Course Provider(TraineeLobby side)
            <TraineeSearch rateVal={props.rateVal} currencyVal={props.currencyVal} token={props.token} />
            <TraineePassword />
        </div>
    )
}

export default TraineeLobby;