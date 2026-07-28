import { PageProps } from "../../types";
import { Box, CardContent, Divider, Grid, IconButton, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material";
import { HintBox } from "../../assets/components/HintBox";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { LoginUpdatePassword } from "../../Template";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PasswordRequirements } from "../../assets/components/senha-requirements";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PasswordUpdate = (props: PageProps<"login-update-password.ftl">) => {
    const [loading, setLoading] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const { i18n, kcContext } = props;
    const { url, messagesPerField, message } = kcContext;
    const { msgStr } = i18n;

    const passwordsMatch = passwordNew === passwordConfirm && passwordNew !== "";
    const isFormValid = isPasswordValid && passwordsMatch;


    return (
        <LoginUpdatePassword i18n={i18n} kcContext={kcContext}>
            <CardContent sx={{ display: "flex", flexDirection: "column", padding: '20px 30px', backgroundColor: '#FCFCFC' }}>
                <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Typography variant="h4"
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '22px',
                            fontWeight: '700',
                            color: '#343435',
                            letterSpacing: '0px'
                        }}>{msgStr('updatePasswordTitle')}
                    </Typography>
                </Box>

                <form onSubmit={() => setLoading(true)} action={url.loginAction} method="post" id="kc-passwd-update-form">
                    <Grid container spacing={2}>
                        {/* Nova Senha */}
                        <Grid size={12}>
                            <InputLabel shrink htmlFor="password-new" sx={{ fontSize: '18px', color: '#3A3A3A' }}>
                                {msgStr('passwordNew')}
                            </InputLabel>
                            <TextField
                                fullWidth
                                size="small"
                                type={showPasswordNew ? 'text' : 'password'}
                                name="password-new"
                                id="password-new"
                                error={messagesPerField.existsError('password', 'password-confirm')}
                                onChange={(e) => setPasswordNew(e.target.value)}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPasswordNew(!showPasswordNew)} edge="end">
                                                    {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>

                        {/* Confirmacao Senha */}
                        <Grid size={12}>
                            <InputLabel shrink htmlFor="password-new" sx={{ fontSize: '18px', color: '#3A3A3A' }}>
                                {msgStr('passwordConfirm')}
                            </InputLabel>
                            <TextField
                                fullWidth
                                size="small"
                                type={showPasswordConfirm ? 'text' : 'password'}
                                name="password-confirm"
                                id="password-confirm"
                                error={messagesPerField.existsError('password-confirm')}
                                helperText={
                                    (passwordConfirm !== "" && !passwordsMatch)
                                        ? "As senhas não coincidem"
                                        : messagesPerField.getFirstError('password-confirm')
                                }
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} edge="end">
                                                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <PasswordRequirements
                                password={passwordNew}
                                t={msgStr as (key: string) => string}
                                onValidationChange={(isValid) => setIsPasswordValid(isValid)}
                            />
                        </Grid>


                        <Grid sx={{display: 'flex', flexDirection: 'column'}} size={12}>
                            <LoadingButton fullWidth variant="contained"
                                loading={loading}
                                type="submit"
                                disabled={!isFormValid}
                                sx={{
                                    backgroundColor: '#4C5C7B',
                                    borderRadius: '7px',
                                    padding: '8px 14px',
                                    fontFamily: 'Roboto, sans-serif',
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

                        <Divider sx={{ margin: "20px 0px" }}></Divider>
                        <Box sx={{display: 'flex', justifyContent: 'left', columnGap: '5px', marginTop: '20px'}}>
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
                                <ArrowBackIcon sx={{ fontSize: '16px', color: 'inherit' }} />
                                {msgStr("backToLogin")}
                            </Link>
                        </Box>
                    </Grid>
                </form>
            </CardContent>
        </LoginUpdatePassword>
    );
};

export { PasswordUpdate };
