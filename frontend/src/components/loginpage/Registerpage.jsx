import { Box ,Button,FormGroup,Grid, TextField, Typography,} from "@mui/material"
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
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router";
import useLogin from "../hooks/useLogin";


const validationSchema = yup.object().shape({
    Username: yup.string().min(6).max(20).required(),
    Email: yup.string().email().required(),
    Password: yup.string().required().min(6),
    confirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match'),
  });
const RegisterPage = ({refetch}) => {
    const [register,regresult] = useRegister()
    const [login,loginresult] = useLogin()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowconfirmPassword = () => setShowconfirmPassword((show) => !show);
    const handleFormSubmit = async () => {
        console.log("juu")
        try{
        const data = await register(formik.values)
        console.log(data)
        if(data.createUser){
            const logindata = await login({Username:formik.values.Username,Password:formik.values.Password})
            if (logindata.data.login.value){
              sessionStorage.setItem("token",logindata.data.login.value)
              refetch()
            navigate("/")
            }
        }
        }catch(error){
            console.log(error.message)
            if (error.message === "Username already in use"){
                formik.setFieldError("Username",error.message)
            }
            if (error.message === "Email already in use"){
                formik.setFieldError("Email",error.message)
            }
        }
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

            <Grid size={{xs:12, md:4}} sx={{}}>

            </Grid>

            <Grid size={{xs:12, md:4}} sx={{}}>
                <Box sx={{border:"solid 0.1em",borderRadius:3}}>
                <FormGroup sx={{alignItems:"center",verticalAlign:"center",marginTop:5,}}>
                <TextField 
                id="username"
                required 
                sx={{ m: 0.5, width: '30ch' }} 
                error={formik.errors.Username} 
                value={formik.values.Username} 
                label="Username" variant="outlined" 
                helperText={formik.errors.Username ? formik.errors.Username : ""} 
                onChange={formik.handleChange("Username")}
                />
                <TextField 
                id="email" 
                required 
                error={formik.errors.Email} 
                helperText={formik.errors.Email ? formik.errors.Email : ""} 
                sx={{ m: 0.5, width: '30ch' }} 
                label="Email" 
                variant="outlined" 
                value={formik.values.Email}
                onChange={formik.handleChange("Email")}
                />
                <TextField 
                id="password"
                error={formik.errors.Password}
                onChange={formik.handleChange("Password")}
                value={formik.values.Password}
                label="Password"
                required
                type={showPassword ? 'display the password' : 'password'}
                variant="outlined"
                sx={{ m: 0.5, width: '30ch' }}
                helperText={formik.errors.Password ? formik.errors.Password : ""}
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
                <TextField 
                id="password"
                error={formik.errors.confirmPassword}
                onChange={formik.handleChange("confirmPassword")}
                value={formik.values.confirmPassword}
                label="Confirm password"
                required
                type={showconfirmPassword ? 'display the password' : 'password'}
                variant="outlined"
                sx={{ m: 0.5, width: '30ch' }}
                helperText={formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}
                slotProps={{
                    input: {
                        endAdornment:                 
                      <InputAdornment position="end">
                      <IconButton
                      aria-label={
                          showconfirmPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowconfirmPassword}
                      edge="end"
                      >
                      {showconfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>,
                    },
                  }}
                />
                <Button sx={{alignSelf:"left",borderRadius:50}} className="button" color="inherit" onClick={formik.handleSubmit} variant="contained">Register</Button>
                </FormGroup>
                </Box>
            
            </Grid>

            <Grid size={{xs:12, md:4}} sx={{}}>
                
            </Grid>

        </Grid>
        </Box>
    )
}
export default RegisterPage