import { Box } from "@mui/system";
import InstructorUpdateBio from "../webcomponents/InstructorUpdateBio";
import InstructorUpdateEmail from "../webcomponents/InstructorUpdateEmail";
import InstructorUpdatePassword from "../webcomponents/InstructorUpdatePassword";

const InstructorUpdateInfo = (props) => {
    const { rateVal, currencyVal, token } = props;
    return (
      <Box>
        <InstructorUpdateEmail
          rateVal={rateVal}
          currencyVal={currencyVal}
          token={token}
        />
        <InstructorUpdatePassword
          rateVal={rateVal}
          currencyVal={currencyVal}
          token={token}
        />
        <InstructorUpdateBio
          rateVal={rateVal}
          currencyVal={currencyVal}
          token={token}
        />{" "}
        {/* <Box className="instructor-list">
                                    <ViewProfileButton />
                                    </Box> */}
      </Box>
    );
}
 
export default InstructorUpdateInfo;