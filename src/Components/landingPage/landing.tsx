
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import backgroung from '../../assets/cover.jpg'
import Paper from '@mui/material/Paper';

export default function Landing() {
    return (
        <Box>
            <Paper  elevation = {3} style={{ maxHeight : 350 , overflow : 'hidden', borderRadius : 0}}>
                <img src={backgroung} alt="" style={{ width: '100vw' , marginTop : '-10%'}} />
            </Paper>
            <Card sx={{ maxWidth: '100vw' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}