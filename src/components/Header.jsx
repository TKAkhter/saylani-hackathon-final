import axios from "axios";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { baseUrl } from "../core";
import { GlobalContext } from "../context/Context";
import { useContext } from "react";

const Header = () => {
  let history = useHistory();

  let { dispatch } = useContext(GlobalContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/livescore-admin");
              }}
            >
              Live Score Admin
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/livescore");
              }}
            >
              Live Score
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                axios
                  .post(
                    `${baseUrl}/api/v1/logout`,
                    {},
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    console.log("res +++: ", res.data);

                    dispatch({
                      type: "USER_LOGOUT",
                    });
                  });
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
