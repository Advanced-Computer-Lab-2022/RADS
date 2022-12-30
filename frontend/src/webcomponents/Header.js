import { Box } from "@mui/system";
import AppNavBar from "./AppNavBar";
import UserDrawer from "./UserDrawer";

const Header = (props) => {
    const { rateVal, currencyVal, handleSelection, user, drawerList, token, page, subpage, drawerFlag } = props;
    return (
      <Box className="side-bar">
        <AppNavBar
          rateValue={rateVal}
          currencyVal={currencyVal}
          handleSelection={handleSelection}
          user={user}
        />
        <UserDrawer
          user={user}
          drawerList={drawerList}
          rateVal={rateVal}
          currencyVal={currencyVal}
          token={token}
          page={page}
          subpage={subpage}
          drawerFlag={drawerFlag}
        />
      </Box>
    );
}
 
export default Header;