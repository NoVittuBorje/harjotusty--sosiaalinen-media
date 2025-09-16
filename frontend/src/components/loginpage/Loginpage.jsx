import { Box ,Button,FormGroup,Grid, TextField, Typography,} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from "react";
import useLogin from "../hooks/useLogin";
import { Link, useNavigate } from "react-router";

const LoginPage = ({setUser,User,refetch}) => {
    const navigate = useNavigate()
    const [login,result] = useLogin();
    const [showPassword, setShowPassword] = React.useState(false);
    const [Username, setUsername] = React.useState("")
    const [Password, setPassword] = React.useState("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    console.log(result)
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const handleFormSubmit = async () => {
        console.log("login")
        const { data } = await login({ Username, Password });
        console.log(data)
        if (data.login.value){
            refetch()
        navigate(-1)
        }
    }
    console.log(Username,Password)
    return(
        <Box sx={{ flexGrow: 1}}>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:4}} >

            </Grid>
            <Grid size={{xs:12, md:4}} >
                <Box sx={{border:"solid 0.1em",borderRadius:3}}>
                
                <FormGroup sx={{alignItems:"center",verticalAlign:"center",marginTop:1}}>
                <Typography variant="h5">Log in</Typography>
                <TextField id="username" sx={{ m: 0.5, width: '25ch' }} label="Username" variant="outlined" onChange={(event) => setUsername(event.target.value)}/>
                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        onChange={(event) => setPassword(event.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        />
                <Button sx={{alignSelf:"left"}} onKeyDown={e => console.log(e.key)} onClick={handleFormSubmit} variant="contained">Log in</Button>
                </FormControl>
                
                
                <Box sx={{paddingX:2}}>
                    <Typography>If you have no account</Typography>
                    <Typography><Link to="/register">register by clicking this</Link></Typography>
                </Box>
                
                
                </FormGroup>
                </Box>

            </Grid>
            <Grid size={{xs:12, md:4}}>
                
            </Grid>
        </Grid>
        </Box>
    )
}
export default LoginPage