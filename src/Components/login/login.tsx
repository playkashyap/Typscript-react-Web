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

const Login = () => {
    document.body.className = 'loginBg';


    // React.useEffect(() => {

    //     const body = {
    //         username: 'kminchelle',
    //         password: '0lelplR',
    //     }

    //     const response = apiService('auth/login', 'POST', body);
    //     response.subscribe((res) => {
    //         console.log(res);
    //     });
    // }, []);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSubmit = (username: any, password: any) => {

        const body = {
            username: username,
            password: password,
        }

        const response = apiService('auth/login', 'POST', body);
        response.subscribe((res) => {
            console.log(res);
        });

    }


    function login() {

        handleSubmit(username, password);
    }


    return (
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
                                id="standard-basic"
                                sx={{ width: '100%', input: { color: "white", } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                label="Username" variant="filled"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
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
                            <Button variant="contained" endIcon={<LoginIcon />} >
                                Login
                            </Button>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={login}>Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}

export default Login;