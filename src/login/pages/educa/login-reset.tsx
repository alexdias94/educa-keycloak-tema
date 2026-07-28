import { PageProps } from "../../types";
import { Box,  CardContent, Divider, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";
import { HintBox } from "../../assets/components/HintBox";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { LoginResetPassword } from "../../Template";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 

const LoginReset = (props: PageProps<"login-reset-password.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, kcContext } = props;
  const { url, realm, messagesPerField, message, auth } = kcContext;
  const { loginWithEmailAllowed, registrationEmailAsUsername } = realm
  const { msgStr } = i18n;

  const attemptedUsername = auth?.attemptedUsername || '';

  return (
    <LoginResetPassword i18n={i18n} kcContext={kcContext}>
      <CardContent sx={{ display: "flex", flexDirection: "column", padding: '20px 30px', backgroundColor: '#FCFCFC' }}>
        <Box sx={{marginBottom: '20px', textAlign: 'center'}}>
          <Typography variant="h4" 
            sx={{
              fontFamily:'Roboto, sans-serif',
              fontSize: '22px',
              fontWeight: '700',
              color: '#343435',
              letterSpacing: '0px'
              }}>{msgStr('emailForgotTitle')}</Typography>
        </Box>
        <form onSubmit={() => setLoading(true)} action={url.loginAction} method="post" id="kc-reset-password-form">
          <Grid container spacing={2}>
            <Grid size={12}>
              <InputLabel shrink htmlFor="username"
                defaultValue={attemptedUsername}
                sx={{
                  fontFamily:'Roboto, sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#3A3A3A',
                  letterSpacing: '0px'
                }}>
                {loginWithEmailAllowed ? msgStr('usernameOrEmail') : registrationEmailAsUsername ? msgStr('usernameOrEmail') : msgStr('username')}
              </InputLabel>
              <TextField 
                error={messagesPerField.existsError('username')} helperText={messagesPerField.getFirstError('username')}  
                hiddenLabel size="small" fullWidth sx={{ 
                  '& .MuiInputBase-input': {
                    padding: '8px 14px',
                  },
                }}
                name="username" id="username" autoFocus >
              </TextField>
            </Grid>
            <Grid sx={{display: 'flex', flexDirection: 'column'}} size={12}>
              <LoadingButton fullWidth variant="contained" loading={loading} type="submit"
                sx={{
                  backgroundColor: '#4C5C7B',
                  borderRadius: '7px',                  
                  padding: '8px 14px',
                  fontFamily:'Roboto, sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#414E68', 
                    color: 'white',
                  },
                  '&.MuiLoadingButton-loading': {
                    backgroundColor: '#4C5C7B', 
                  },
                }}>{msgStr('doSubmit')}</LoadingButton>
              {message && <HintBox style={{ marginTop: "10px", textAlign: "center" }} type={message?.type === 'success' ? 'info' : message.type} message={message.summary} />}
            </Grid>
          </Grid>
          <Box sx={{textAlign: "center"}}>
            <Divider sx={{ margin: "20px 0px" }}></Divider>
            <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'left', columnGap: '5px'}}>
              <Link 
                href={url.loginUrl}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '5px',
                  color: '#343435',
                  textDecoration: 'none',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  '&:hover': {
                    color: '#C49602'
                  }
                }}>
                  <ArrowBackIcon sx={{ fontSize: '16px', color: 'inherit' }}/>
                  {msgStr("backToLogin")}
                </Link>
            </Box>
          </Box>
        </form>
      </CardContent>
    </LoginResetPassword>
  );
};

export { LoginReset };
