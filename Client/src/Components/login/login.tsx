import './login.scss';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import apiService from '../../shared/services/apiService';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = (props: any) => {

    const onLogin = props.onLogin;
    document.body.className = 'loginBg';

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorInCredantials, setErrorInCredantials] = React.useState(false);
    const [changeSignup, setChangeSignup] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    const handleSubmit = (username: any, password: any) => {

        const body = {
            username: username,
            password: password,
        }

        const response = apiService('login', 'POST', body);
        response.subscribe((res) => {
            if (res.status === 400) {
                setErrorInCredantials(true);
                toast.error(res.response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                onLogin(false);
            } else if (res.status === 200) {
                localStorage.setItem('token', res.response.token);
                onLogin(true);
            }
        });
    }


    const login = () => {
        handleSubmit(username, password);
    }

    const goToSignup = () => {
        setChangeSignup(true);
    }

    const goToLogin = () => {
        setChangeSignup(false);
    }


    const [newUsername, setNewUsername] = React.useState('');


    const [userNameError, setUserNameError] = React.useState('');

    const registerUser = () => {

    }


    return (
        <>
            {changeSignup == false ?
                <>
                    <div className="loginCard">
                        <Card sx={{ minWidth: 300, maxWidth: 600, background: 'transparent', boxShadow: 'none' }}>
                            <CardContent>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Avatar sx={{ width: 190, height: 190 }} src='/android-chrome-512x512.png'></Avatar>
                                </div>
                                <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px', color: 'whitesmoke' }}>Login</h1>
                                <Box component="form">
                                    <TextField
                                        error={errorInCredantials}
                                        id="standard-basic"
                                        sx={{ width: '100%', input: { color: "white", } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        label="Username" variant="filled"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        error={errorInCredantials}
                                        id="standard-basic"
                                        sx={{ width: '100%', marginTop: 3, input: { color: "white", } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        label="Password"
                                        variant="filled"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Box>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button variant="contained" endIcon={<LoginIcon />} onClick={() => login()}>
                                        Login
                                    </Button>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => goToSignup()} sx={{ color: 'white' }}>Sign Up</Button>
                            </CardActions>
                        </Card>
                    </div>
                </> :
                <>
                    <div className="loginCard">
                        <Card sx={{ minWidth: 300, maxWidth: 1000, background: 'transparent', boxShadow: 'none' }}>
                            <CardContent>
                                <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px', color: 'whitesmoke' }}>Register</h1>

                                <Box component="form">
                                    <TextField
                                        error={userNameError.length > 0}
                                        id="standard-basic"
                                        sx={{ width: '100%', input: { color: "white", } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        label="Username" variant="filled"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 1, sm: 2, md: 4 }}
                                        sx={{ marginTop: 3 }}
                                    >
                                        <FormControl sx={{ width: '100%' }} variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password" sx={{ color: "white" }} >Password</InputLabel>
                                            <FilledInput
                                                id="filled-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                sx={{ input: { color: "white", } }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                        <FormControl sx={{ width: '100%' }} variant="filled">
                                            <InputLabel htmlFor="filled-adornment-password" sx={{ color: "white" }} >Confirm Password</InputLabel>
                                            <FilledInput
                                                id="filled-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                sx={{ input: { color: "white", } }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    </Stack>

                                </Box>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button variant="contained" endIcon={<AppRegistrationIcon />} onClick={() => registerUser()}>
                                        Register
                                    </Button>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => goToLogin()} sx={{ color: 'white' }}>Login</Button>
                            </CardActions>
                        </Card>
                    </div>
                </>

            }
        </>
    )
}

export default Login;