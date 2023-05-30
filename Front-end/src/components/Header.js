import React, { useContext, useEffect, useState } from "react";
import "./css/header.css";
import { context } from "../context/UserControl";
import { backendFetchGET } from "../utils/backendFetch";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Header = (props) => {
  const { loggedIn, setLoggedIn } = useContext(context);
  const [admin, setAdmin] = useState("none");
  const [workshopControl, setWorkshopControl] = useState("none");
  const [standartUser, setStandartUser] = useState("none");
  const navigate = useNavigate();
  const { user, setUser } = useContext(context);
  let firstChar = user ? user.username[0].toUpperCase() : "";

  const LogOut = () => {
    backendFetchGET("/logout", async (response) => {
      const data = await response.json();
      if (response.status === 202) {
        setLoggedIn(false);
        navigate("/");
      }
    });
  };
  useEffect(() => {
    backendFetchGET("/user", async (response) => {
      try {
        const data = await response.json();
        setUser(data);

        if (data.admin === "admin") {
          setStandartUser("none");
          setWorkshopControl("none");
          setAdmin("block");
        } else if (data.workshop !== "null") {
          setStandartUser("none");
          setAdmin("none");
          setWorkshopControl("block");
        } else {
          setAdmin("none");
          setWorkshopControl("none");
          setStandartUser("block");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, [loggedIn]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loggedIn === false) {
    return (
      <div className="header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
            <Link to="/" className="servis">
              <h5>Servis Bul</h5>{" "}
            </Link>
            <Link to="/fuelaccount" className="dukkan">
              {" "}
              <h5>Yakıt Hesapla</h5>
            </Link>
          </div>
          <div className="header-right">
            <Link to="/login">
              <h5>Giriş Yap</h5>
            </Link>
            <Link to="/register">
              <h5>Kayıt Ol</h5>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        <div className="header-container">
          <div className="header-left">
            <a href="/">
              <img src="./images/logo.png" alt="logo" />
            </a>
            <Link to="/" className="servis">
              <h5>Servis Bul</h5>{" "}
            </Link>

            <Link to="/fuelaccount" className="dukkan">
              {" "}
              <h5>Yakıt Hesapla</h5>
            </Link>
          </div>
          <div className="header-right">
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 45, height: 45, bgcolor: "red" }}>
                      {firstChar}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,

                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div style={{ display: admin }}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> {user.username}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/admin">Admin</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/fueladd">Yakıt Ekle</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/fueldetails">Yakıt Detayları</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={LogOut}>
                    <ListItemIcon></ListItemIcon>
                    Cıkıs Yap
                  </MenuItem>
                </div>
                <div style={{ display: workshopControl }}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> {user.username}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/workshopadmin">Workshop</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/fueladd">Yakıt Ekle</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/fueldetails">Yakıt Detayları</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={LogOut}>
                    <ListItemIcon></ListItemIcon>
                    Cıkıs Yap
                  </MenuItem>
                </div>
                <div style={{ display: standartUser }}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> {user.username}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/fueladd">Yakıt Ekle</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon></ListItemIcon>
                    <Link to="/fueldetails">Yakıt Detayları</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={LogOut}>
                    <ListItemIcon></ListItemIcon>
                    Cıkıs Yap
                  </MenuItem>
                </div>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
