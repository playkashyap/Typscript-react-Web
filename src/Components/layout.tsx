import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, NavLink, redirect } from 'react-router-dom';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const drawerWidth = 240;


function MyApp() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                PlayKashyap
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <NavLink to={'/home'}>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink to={'/about'}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText>About me</ListItemText>
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink to={'/contact'}>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText>Contact</ListItemText>
                        </ListItemButton>
                    </NavLink>
                </ListItem>
            </List>
        </Box>
    );

    return (


        <Box sx={{ display: 'flex', width: '100%', height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Box>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }} />
                        </IconButton>
                        <IconButton sx={{ ml: 1, display: { sm: 'none' } }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: '#fff' }} /> : <Brightness4Icon sx={{ color: '#000' }} />}
                        </IconButton>
                    </Box>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                        PlayKashyap
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: '#fff' }} /> : <Brightness4Icon sx={{ color: '#000' }} />}
                        </IconButton>
                        <NavLink to={'/home'}>
                            <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to={'/about'}>
                            <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                About Me
                            </Button>
                        </NavLink>
                        <NavLink to={'/contact'}>
                            <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                                Contact
                            </Button>
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main">
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}


function Layout() {


    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Layout
