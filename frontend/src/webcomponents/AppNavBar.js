import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { MultiSelectUnstyled } from "@mui/base";
import { Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import SelectCountry from "./SelectCountry";
import SearchBar from "./SearchBar";
import jwt_decode from "jwt-decode";

const pages = ["Home","About"];
const settings = ["Profile", "Lobby", "Logout"];

const AppNavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { rateValue, currencyVal, handleSelection, user, token } = props;

  var userId = 0;
  React.useEffect(() => {
    if (user.isConnected) {
      const decode = jwt_decode(token);
      userId = decode.id;
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="text" position="sticky" className="appnavbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Card
            sx={{
              maxWidth: 345,
              paddingleft: 0,
              borderRadius: 0,
              boxShadow: 0,
              "&:hover, &.Mui-focusVisible": { color: "white" },
            }}
            onClick={() => (window.location.href = "/")}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://cancham.org.eg/upload/logo.png"
                alt="green iguana"
                sx={{
                  height: 75,
                  marginRight: 3,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />
            </CardActionArea>
          </Card>

          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}

          {/* <SearchBar rateVal={props.rateValue} currencyVal={props.currencyVal} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  variant="outlined"
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                variant="default"
                key={page}
                onClick={page === "Home" ? () => (window.location.href = "/") :
                  () => (window.location.href = "/about")}
                sx={{
                  color: "#D80621",
                  display: "block",
                  fontSize: 18,
                  fontWeight: 500,
                  textDecoration: "none",
                  textTransform: "none",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <SelectCountry
            sx={{ marginRight: 2 }}
            handleSelection={handleSelection}
          />

          <Box sx={{ flexGrow: 0, display: "flex", marginLeft: 2 }}>
            <Tooltip title="View Profile">
              {!user.isConnected ? (
                <>
                  <Button
                    sx={{
                      color: "#D80621",
                      display: "block",
                      fontSize: 18,
                      fontWeight: 500,
                      textDecoration: "none",
                      textTransform: "none",
                    }}
                    onClick={() => (window.location.href = `/login`)}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#D80621",
                      display: "block",
                      fontSize: 18,
                      fontWeight: 500,
                      textDecoration: "none",
                      textTransform: "none",
                    }}
                    onClick={() => (window.location.href = `/signup`)}
                  >
                    Sign up
                  </Button>
                </>
              ) : ( user.role === "ADMIN" ? (
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() =>
                    (window.location.href = `/adminprofile?adminId=${userId}`)
                  }
                >
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              ) : user.role === "TRAINEE" ? (
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() =>
                    (window.location.href = `/traineeprofile?traineeId=${userId}`)
                  }
                >
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              ) : user.role === "CORP_TRAINEE" ? (
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() =>
                    (window.location.href = `/corptraineeprofile?corptraineeId=${userId}`)
                  }
                >
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              ) : user.role === "INSTRUCTOR" ? (
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() =>
                    (window.location.href = `/instructorprofile?instructorId=${userId}`)
                  }
                >
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              ) : (
                <></>
              ))}
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={props.user.firstName}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton> */}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppNavBar;
