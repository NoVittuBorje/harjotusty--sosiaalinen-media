import { Box ,Button,createTheme,FormGroup,Grid, TextField, Typography,} from "@mui/material"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from "react";
import * as yup from 'yup'
import { useFormik } from 'formik';


const validationSchema = yup.object().shape({
    Username: yup.string().required(),
    Email: yup.string().email().required(),
    Password: yup.string().required().min(6),
    confirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match'),
  });
const RegisterPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = React.useState(false);
    const [Username, setUsername] = React.useState("")
    const [UsernameError, setUsernameError] = React.useState(false)
    const [Email, setEmail] = React.useState("")
    const [EmailError, setEmailError] = React.useState(false)
    const [Password, setPassword] = React.useState("")
    const [PasswordError, setPasswordError] = React.useState(false)
    const [confirmPassword, setconfirmPassword] = React.useState("")
    const [confirmPasswordError, setconfirmPasswordError] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowconfirmPassword = () => setShowconfirmPassword((show) => !show);
    const handleFormSubmit = async () => {
    
    }
    
    const formik = useFormik({
        initialValues:{
          Username:"",
          Password:"",
          confirmPassword:"",
          Email:"",

        },
        onSubmit: values => {
          handleFormSubmit(values)
        },
        validationSchema,
      })
    

    console.log(formik.errors)
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Box sx={{textAlign:"center"}}>
            <h3>Register your account</h3>
        </Box>
        
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>

            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>

            <Grid size={{xs:12, md:8}} sx={{border:"solid 0.1em",}}>
                <Box sx={{border:"solid 0.1em"}}>
                <FormGroup sx={{alignItems:"center",verticalAlign:"center",marginTop:10,}}>
                <TextField 
                id="username" 
                required 
                sx={{ m: 0.5, width: '25ch' }} 
                error={formik.errors.Username} 
                value={formik.values.Username} 
                label="Username" variant="outlined" 
                helperText={formik.errors.Username ? "Please enter username (letters and numbers only)" : ""} 
                onChange={formik.handleChange("Username")}
                />
                <TextField 
                id="email" 
                required 
                error={formik.errors.Email} 
                helperText={formik.errors.Email ? "Please enter valid email" : ""} 
                sx={{ m: 0.5, width: '25ch' }} 
                label="Email" 
                variant="outlined" 
                value={formik.values.Email}
                onChange={formik.handleChange("Email")}
                />
                <TextField 
                id="password2"
                error={formik.errors.Password}
                onChange={formik.handleChange("Passrord")}
                value={formik.values.Password}
                label="Password"
                variant="outlined"
                sx={{ m: 0.5, width: '25ch' }}
                slotProps={{
                    input: {
                        endAdornment:                 
                      <InputAdornment position="end">
                      <IconButton
                      aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                      >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>,
                    },
                  }}
                />
                
                
                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        error={formik.errors.Password}
                        onChange={formik.handleChange("Password")}
                        value={formik.values.Password}
                        type={showPassword ? 'text' : 'password'}
                        helperText={formik.errors.Password ? "Please enter valid password" : ""}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        />
                </FormControl>
                <FormControl sx={{ m: 0.5, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="confirmPassword">Password again</InputLabel>
                    <OutlinedInput
                        id="confirmPassword"
                        error={formik.errors.confirmPassword}
                        onChange={formik.handleChange("confirmPassword")}
                        value={formik.values.confirmPassword}
                        type={showconfirmPassword ? 'text' : 'password'}
                        helperText={formik.errors.confirmPassword ? "Passwords must match" : ""}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowconfirmPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        />
                </FormControl>
                <Button sx={{alignSelf:"left"}} onClick={handleFormSubmit} variant="contained">Log in</Button>
                </FormGroup>
                </Box>
            
            </Grid>

            <Grid size={{xs:12, md:2}} sx={{}}>
                
            </Grid>

        </Grid>
        </Box>
    )
}
export default RegisterPage