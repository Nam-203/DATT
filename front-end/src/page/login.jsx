import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify/dist";
import { query } from "../access";
import { authAction, getUserDecode } from "../redux/authSlice";

const theme = createTheme();

const Copyright = (props) => (
  <Typography color="text.secondary" fontSize="13px" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href="/">
      thegioihouseware
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector(getUserDecode);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginPayload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const { data } = await query().auth.login(loginPayload);
      toast.success("Bạn đã đăng nhập thành công");
      dispatch(authAction.setUser(data.token));
      history.push("/");
    } catch (error) {
      toast.error("Thông tin không hợp lệ. Vui lòng kiểm tra lại");
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    if (userInfo !== null) {
      console.log("pass");
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
            <img src={process.env.PUBLIC_URL + "favicon.svg"} alt="" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: "13px" }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" style={{ fontSize: "13px" }}>
                  Quên mật khẩu
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="http://localhost:3080/register"
                  style={{ fontSize: "13px" }}
                >
                  Không có tài khoản? Đăng ký
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
