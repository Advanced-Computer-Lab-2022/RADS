import TraineePassword from "../webcomponents/TraineePassword";
import TraineeSearch from "../webcomponents/TraineeSearch";
import TraineeCreditCard from "../webcomponents/TraineeCreditCard";
import { Box } from "@mui/material";

const TraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;

    return (
        <Box className="home-lobby" >
            Welcome to RADS Online Course Provider(TraineeLobby side)
            <TraineeSearch rateVal={props.rateVal} currencyVal={props.currencyVal} token={props.token} />
            <TraineePassword rateVal={props.rateVal} currencyVal={props.currencyVal} token={props.token} />
        </Box>
    )
}

export default TraineeLobby;