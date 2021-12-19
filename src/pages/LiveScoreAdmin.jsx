import { useEffect } from "react";
import { baseUrl } from "../core";
import { useState } from "react";
import Header from "../components/Header";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";

// import { GlobalContext } from "../context/Context";
// import { useContext } from "react";
import io from "socket.io-client";

const socket = io(baseUrl);

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const theme = createTheme();

function LiveScoreAdmin() {
//   let { dispatch } = useContext(GlobalContext);

  const [Team1, setTeam1] = useState("");

  const handleChangeTeam1 = (event) => {
    setTeam1(event.target.value);
  };
  const [Team2, setTeam2] = useState("");

  const handleChangeTeam2 = (event) => {
    setTeam2(event.target.value);
  };
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      console.log("values: ", values);

      io.emit("Test topic", {
        event: "ADDED_ITEM",
        data: "some data test",
      });
    },
  });

  useEffect(() => {
    socket.on("connect", function () {
      console.log("connected to server");
    });
    // to subcribe to a topic
    socket.on("Test topic", function (data) {
      // console.log(data);
    });
    socket.on("disconnect", function (message) {
      console.log("disconnected from server: ", message);
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", overflow: "hidden" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Live Score Admin
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Match Title"
                  name="text"
                  autoComplete="title"
                  autoFocus
                  color="primary"
                  variant="outlined"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="text"
                  label="Toss Result"
                  type="tossResult"
                  id="tossResult"
                  autoComplete="current-tossResult"
                  color="primary"
                  variant="outlined"
                  value={formik.values.tossResult}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tossResult &&
                    Boolean(formik.errors.tossResult)
                  }
                  helperText={
                    formik.touched.tossResult && formik.errors.tossResult
                  }
                />
                <InputLabel id="team1">Team 1</InputLabel>
                <Select
                  labelId="team1"
                  id="team1-select"
                  value={Team1}
                  label="Team 1"
                  onChange={handleChangeTeam1}
                  autoWidth
                >
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                </Select>
                <InputLabel id="team2">Team 2</InputLabel>
                <Select
                  labelId="team2"
                  id="team2-select"
                  value={Team2}
                  label="Team 2"
                  onChange={handleChangeTeam2}
                  autoWidth
                >
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                </Select>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                >
                  Set Live
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default LiveScoreAdmin;
