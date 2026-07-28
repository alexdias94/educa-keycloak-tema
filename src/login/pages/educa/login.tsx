import { useState } from "react";
import { PageProps } from "../../types";
import { getRegistrationUrl } from "../../assets/utils/getRegistrationUrl";
import { Box, Button, CardContent, Checkbox, Divider, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { HintBox } from "../../assets/components/HintBox";


const Login = (props: PageProps<"login.ftl">) => {
    const [loading, setLoading] = useState(false);
    const { i18n, Template, kcContext } = props;
    const { url, realm, social, message, messagesPerField, client } = kcContext;
    const { loginWithEmailAllowed, resetPasswordAllowed, registrationAllowed, rememberMe } = realm
    const { msgStr } = i18n;

    const [showPassword, setShowPassword] = useState(false);

    const currentOrigin = window.location.origin;
    const clientId = client?.clientId;

    const registrationUrl = getRegistrationUrl(currentOrigin, clientId, url.registrationUrl);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <Template i18n={i18n} kcContext={kcContext}>
            <CardContent sx={{ display: "flex", flexDirection: "column", padding: '20px 30px', backgroundColor: '#FCFCFC' }}>
                <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Typography variant="h4"
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '22px',
                            fontWeight: '700',
                            color: '#343435',
                            letterSpacing: '0px'
                        }}>{msgStr('loginAccountTitle')}</Typography>
                </Box>
                <form onSubmit={() => setLoading(true)} id="kc-form-login" action={url.loginAction} method="post">
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <InputLabel shrink htmlFor="username"
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    color: '#3A3A3A',
                                    letterSpacing: '0px'
                                }}>
                                {loginWithEmailAllowed ? msgStr('usernameOrEmail') : msgStr('username')}
                            </InputLabel>
                            <TextField
                                error={messagesPerField.existsError('username')} helperText={messagesPerField.getFirstError('username')}
                                hiddenLabel size="small" fullWidth
                                sx={{
                                    '& .MuiInputBase-input': {
                                        borderRadius: '7px',
                                        padding: '8px 14px',
                                    },
                                }}
                                name="username" id="username">
                            </TextField>
                        </Grid>
                        <Grid size={12}>
                            <InputLabel shrink htmlFor="password"
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    color: '#3A3A3A',
                                    letterSpacing: '0px'
                                }}>
                                {msgStr('password')}
                            </InputLabel>
                            <TextField
                                error={messagesPerField.existsError('password')}
                                helperText={messagesPerField.getFirstError('password')}
                                hiddenLabel size="small" fullWidth
                                sx={{
                                    '& .MuiInputBase-input': {
                                        padding: '8px 14px',
                                        borderRadius: '7px'
                                    },
                                }}
                                type={showPassword ? 'text' : 'password'} name="password" id="password"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: '18px'
                                                        },
                                                    }}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        {rememberMe && (
                            <Grid size={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="rememberMe"
                                                name="rememberMe"
                                                value="true"
                                                defaultChecked={rememberMe === true}
                                                sx={{
                                                    padding: '9px',
                                                    '& .MuiSvgIcon-root': { fontSize: 20 },
                                                    color: '#31415a',
                                                    '&.Mui-checked': {
                                                        color: '#0178D4',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    color: '#31415a',
                                                    letterSpacing: '0px',
                                                }}>
                                                {msgStr('rememberMe')}
                                            </Typography>
                                        }
                                    />
                                </Box>
                            </Grid>
                        )}
                        <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <LoadingButton fullWidth variant="contained" loading={loading} type="submit"
                                sx={{
                                    backgroundColor: '#4c5c7b',
                                    borderRadius: '7px',
                                    padding: '8px 14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#414e68',
                                        color: 'white',
                                    },
                                    '&.MuiLoadingButton-loading': {
                                        backgroundColor: '#4C5C7B',
                                    },
                                }}>{msgStr('doLogIn')}</LoadingButton>
                            {message && <HintBox style={{ marginTop: "10px", textAlign: "center" }} type={message?.type === 'success' ? 'info' : message.type} message={message.summary} />}
                        </Grid>
                    </Grid>
                    {(resetPasswordAllowed || registrationAllowed || !!social?.providers?.length) && (
                        <Box sx={{ textAlign: 'center' }}>
                            <Divider sx={{ margin: "20px 0px" }}></Divider>
                            {!!social?.providers?.length && (
                                social.providers.map((x, i) => <Button id={`social-${x.alias}`} href={x.loginUrl} sx={{ marginBottom: "10px" }} key={i} variant="outlined" fullWidth>{x.displayName}</Button>)
                            )}
                            {registrationAllowed && (
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'left',
                                    columnGap: '5px'
                                }}>
                                    <Typography variant="caption"
                                        sx={{
                                            textDecoration: 'none',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '14px',
                                            letterSpacing: '0px'
                                        }}>{msgStr('noAccountYet')}</Typography>
                                    <Typography variant="caption" href={registrationUrl} component={Link}
                                        sx={{
                                            color: '#343435',
                                            textDecoration: 'none',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: '550',
                                            fontSize: '14px',
                                            letterSpacing: '0px',
                                            '&:hover': {
                                                color: '#BF8200'
                                            }
                                        }}>{msgStr('doRegister')}</Typography>
                                </Box>
                            )}
                            {resetPasswordAllowed && (
                                <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'left', columnGap: '5px'}}>
                                    <Typography variant="caption" href={url.loginResetCredentialsUrl} component={Link}
                                        sx={{
                                            paddingTop: '10px',
                                            color: '#343435',
                                            textDecoration: 'none',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: '550',
                                            fontSize: '14px',
                                            letterSpacing: '0px',
                                            '&:hover': {
                                                color: '#BF8200'
                                            }
                                        }}>{msgStr('resetPassword')}</Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </form>
            </CardContent>
        </Template>
    );
};

export { Login };