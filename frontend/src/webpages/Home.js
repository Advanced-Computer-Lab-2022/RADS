import { Box } from "@mui/material";
import HomeSearch from "../webcomponents/HomeSearch";

const Home = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    return (
        <Box>
            <HomeSearch rateVal = {props.rateVal} currencyVal={props.currencyVal}/>
        </Box>
    )
}

export default Home;