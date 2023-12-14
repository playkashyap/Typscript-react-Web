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
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { countryList } from '../../shared/countries/countryList';
import { MuiTelInput } from 'mui-tel-input'
import FormHelperText from '@mui/material/FormHelperText';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = (props: any) => {

    const onLogin = props.onLogin;
    document.body.className = 'loginBg';

    const [changeSignup, setChangeSignup] = React.useState(false);

    // for login

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorInCredantials, setErrorInCredantials] = React.useState(false);

    const [showLoginPassword, setShowLoginPassword] = React.useState(false);

    const handleClickShowLoginPassword = () => setShowLoginPassword((show) => !show);
    const handleMouseDownLoginPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    // for signup


    // username
    const [newUsername, setNewUsername] = React.useState('');
    const [userNameError, setUserNameError] = React.useState('');

    // password
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfPassword, setShowConfPassword] = React.useState(false);

    const [newPassword, setNewPassword] = React.useState('');
    const [confNewPassword, setConfNewPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [passBool, setPassBool] = React.useState(false);

    // gender 
    const [gender, setGender] = React.useState('');
    const [genderError, setGenderError] = React.useState('');

    // phone 
    const [phone, setPhone] = React.useState('');
    const [phoneError, setPhoneError] = React.useState('');

    // country
    const [country, setCountry] = React.useState('');
    const [countryError, setCountryError] = React.useState('');

    //  name
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');

    // email
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownConfPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handlePhoneChange = (newPhone: any) => {
        setPhone(newPhone);
        setPhoneError('');
    }



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

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
        setGenderError('');
    };

    const handleCountryChange = (event: any) => {
        setCountry(event.target.textContent);
        setCountryError('');
    }

    const getPassword = (event: any) => {
        setNewPassword(event.target.value);
    }

    const getConfPassword = (event: any) => {
        setConfNewPassword(event.target.value);
    }


    const registerUser = () => {

        const body = {
            username: newUsername,
            password: newPassword,
            confPassword: confNewPassword,
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            country: country,
            phoneNumber: phone
        }

        console.log(body);

        const response = apiService('register', 'POST', body);
        response.subscribe((res) => {
            if (res.status === 400) {
                toast.error(res.response.status, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(res);

                for (let item of res.response.validations) {
                    switch (item.key) {
                        case 'username':
                            setUserNameError(item.message);
                            break;
                        case 'email':
                            setEmailError(item.message);
                            break;
                        case 'firstName':
                            setFirstNameError(item.message);
                            break;
                        case 'lastName':
                            setLastNameError(item.message);
                            break;
                        case 'password':
                            setPasswordError(item.message);
                            setPassBool(true);
                            break;
                        case 'country':
                            setCountryError(item.message);
                            break;
                        case 'gender':
                            setGenderError(item.message);
                            break;
                        case 'phoneNumber':
                            setPhoneError(item.message);
                            break;
                        default:
                            break;
                    }
                }

            } else if (res.status === 200) {
                toast.success('Registered Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                goToLogin();
            }
        });



    }


    return (
        <>
            {changeSignup == false ?
                <>
                    <div className="loginCard">
                        <Card sx={{ minWidth: 300, maxWidth: 600, background: 'transparent', boxShadow: 'none' }}>
                            <CardContent>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Avatar sx={{ width: 190, height: 190 }} src='./logo.jpg'></Avatar>
                                </div>
                                <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px', color: 'whitesmoke' }}>Login</h1>
                                <Box component="form">
                                    <TextField
                                        error={errorInCredantials}
                                        id="username"
                                        sx={{ width: '100%', input: { color: "white", } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        label="Username" variant="filled"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        helperText={errorInCredantials ? 'Invalid Username or Password' : null}
                                    />
                                    <FormControl sx={{ width: '100%', marginTop: 3 }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password" sx={{ color: "white" }} >Password</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            type={showLoginPassword ? 'text' : 'password'}
                                            sx={{ input: { color: "white", } }}
                                            onChange={(e) => { setPassword(e.target.value); setErrorInCredantials(false) }}
                                            error={errorInCredantials}
                                            aria-activedescendant='password-helper-text'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowLoginPassword}
                                                        onMouseDown={handleMouseDownLoginPassword}
                                                        edge="end"
                                                    >
                                                        {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {errorInCredantials ? <FormHelperText id="password-helper-text" sx={{ color: '#d32f2f' }}>Invalid username or password</FormHelperText> : null}
                                    </FormControl>


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
                                <h1 style={{ textAlign: 'center', margin: 3, color: 'whitesmoke' }}>Register</h1>

                                <Box component="form">
                                    <TextField
                                        error={userNameError.length > 0}
                                        id="newUsername"
                                        sx={{ width: '100%', input: { color: "white", } }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        label="Username" variant="filled"
                                        value={newUsername}
                                        onChange={(e) => { setNewUsername(e.target.value); setUserNameError('') }}
                                        helperText={userNameError.length > 0 ? userNameError : null}
                                    />
                                    <TextField
                                        variant="filled"
                                        error={emailError.length > 0}
                                        id="email"
                                        sx={{ width: '100%', input: { color: "white", }, marginTop: 3 }}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        label="Email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                                        helperText={emailError.length > 0 ? emailError : null}
                                    />
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 1, sm: 2, md: 4 }}
                                        sx={{ marginTop: 3 }}
                                    >
                                        <TextField
                                            variant="filled"
                                            error={firstNameError.length > 0}
                                            id="firstName"
                                            sx={{ width: '100%', input: { color: "white", }, }}
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            label="First Name"
                                            value={firstName}
                                            onChange={(e) => { setFirstName(e.target.value); setFirstNameError('') }}
                                            helperText={firstNameError.length > 0 ? firstNameError : null}
                                        />
                                        <TextField
                                            variant="filled"
                                            error={lastNameError.length > 0}
                                            id="lastName"
                                            sx={{ width: '100%', input: { color: "white", }, }}
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            label="Last Name"
                                            value={lastName}
                                            onChange={(e) => { setLastName(e.target.value); setLastNameError('') }}
                                            helperText={lastNameError.length > 0 ? lastNameError : null}
                                        />

                                    </Stack>
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
                                                onChange={getPassword}
                                                error={passBool}
                                                aria-activedescendant='password-helper-text'
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
                                            {passBool ? <FormHelperText id="password-helper-text" sx={{ color: '#d32f2f' }}>{passwordError}</FormHelperText> : null}
                                        </FormControl>

                                        <FormControl sx={{ width: '100%' }} variant="filled">
                                            <InputLabel htmlFor="filled-adornment-confPassword" sx={{ color: "white" }} >Confirm Password</InputLabel>
                                            <FilledInput
                                                id="filled-adornment-confPassword"
                                                type={showConfPassword ? 'text' : 'password'}
                                                sx={{ input: { color: "white", } }}
                                                onChange={getConfPassword}
                                                error={passBool}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfPassword}
                                                            onMouseDown={handleMouseDownConfPassword}
                                                            edge="end"
                                                        >
                                                            {showConfPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    </Stack>
                                    <Autocomplete
                                        id="country-select"
                                        options={countryList}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        onChange={handleCountryChange}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    alt=""
                                                />
                                                {option.label} ({option.code}) +{option.phone}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                sx={{ width: '100%', input: { color: "white", }, marginTop: 3 }}
                                                InputLabelProps={{ style: { color: 'white' } }}
                                                label="Country"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                                error={countryError.length > 0}
                                                helperText={countryError.length > 0 ? countryError : null}
                                            />

                                        )}
                                    />
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 1, sm: 2, md: 4 }}
                                        sx={{ marginTop: 3 }}
                                    >
                                        <FormControl variant="filled" sx={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-label" sx={{ color: "white" }} >Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                error={genderError.length > 0}
                                                value={gender}
                                                sx={{ color: "white" }}
                                                label="Gender"
                                                onChange={handleGenderChange}

                                            >
                                                <MenuItem value={'male'}>Male</MenuItem>
                                                <MenuItem value={'female'}>Female</MenuItem>
                                                <MenuItem value={'other'}>Other</MenuItem>
                                            </Select>
                                            {genderError.length > 0 ? <FormHelperText id="password-helper-text" sx={{ color: '#d32f2f' }}>{passwordError}</FormHelperText> : null}
                                        </FormControl>
                                        <MuiTelInput
                                            sx={{ width: '100%', color: "white", input: { color: "white" } }}
                                            value={phone}
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            variant='filled'
                                            defaultCountry="IN"
                                            onChange={handlePhoneChange}
                                            label="Phone Number"
                                            error={phoneError.length > 0}
                                            helperText={phoneError.length > 0 ? phoneError : null}
                                        />
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