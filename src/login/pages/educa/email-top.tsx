import { PageProps } from "../../types";
import { Box, CardContent, Checkbox, Divider, FormControlLabel, InputLabel, Link, Typography, Grid } from "@mui/material";
import { HintBox } from "../../assets/components/HintBox";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { EmailLoginOtp } from "../../Template";
import OtpInputComponent from 'react-otp-input';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const EmailOtp = (props: PageProps<"email-otp-code.ftl">) => {
  const { kcContext, i18n } = props;
  const { url, messagesPerField, message } = kcContext;
  const { msgStr } = i18n;

  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getTranslatedMessage = (summary?: string) => {
    if (!summary) return "";
    try {
      return msgStr(summary as Parameters<typeof msgStr>[0]);
    } catch {
      return summary;
    }
  };


  return (
    <EmailLoginOtp i18n={i18n} kcContext={kcContext}>
      <CardContent sx={{ display: "flex", flexDirection: "column", padding: '20px 30px', backgroundColor: '#FCFCFC' }}>
        <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
          <Typography variant="h4"
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '20px',
              fontWeight: '700',
              color: '#343435',
              letterSpacing: '0px'
            }}>
            2º Fator de Autenticação
          </Typography>
        </Box>

        <form onSubmit={() => setLoading(true)} id="kc-email-otp-form" action={url.loginAction} method="post">
          <Grid container spacing={2}>
            <Grid size={12}>
              <InputLabel shrink htmlFor="totp"
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#3A3A3A',
                  letterSpacing: '0px'
                }}>
                Digite o código enviado por e-mail
              </InputLabel>
              <OtpInputComponent
                value={otpValue}
                shouldAutoFocus
                onChange={setOtpValue}
                numInputs={6}
                inputType="tel"
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '0 4px',
                      borderRadius: '7px',
                      borderColor: messagesPerField.existsError('totp') ? 'red' : '#ccc',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      textAlign: 'center',
                      fontSize: '16px'
                    }}
                  />
                )}
              />
              <input type="hidden" name="otp" value={otpValue} />
              {/* {message && <HintBox style={{ marginTop: "10px", textAlign: "center" }} type={message?.type === 'success' ? 'info' : message.type} message={message.summary} />} */}
              {message && (
                <HintBox
                  style={{ marginTop: "10px", textAlign: "center" }}
                  type={message?.type === 'success' ? 'info' : message.type}
                  message={getTranslatedMessage(message.summary)}
                />
              )}
            </Grid>

            {/* Checkbox para confiar no computador por 8 horas */}
            <Grid size={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="trustDevice"
                      name="trustDevice"
                      value="true"
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
                      Confiar neste computador por 8 horas
                    </Typography>
                  }
                />
              </Box>
            </Grid>

            <Grid sx={{ display: 'flex', flexDirection: 'column' }} size={12}>
              <LoadingButton fullWidth variant="contained" loading={loading} type="submit"
                sx={{
                  backgroundColor: '#4C5C7B',
                  borderRadius: '7px',
                  padding: '10px 14px',
                  fontFamily: 'Roboto, sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#414E68',
                    color: 'white',
                  },
                  '&.MuiLoadingButton-loading': {
                    backgroundColor: '#4C5C7B',
                  },
                }}>
                Validar acesso
              </LoadingButton>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: '5px' }}>
              <Typography variant="caption"
                component={Link}
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('kc-email-otp-form') as HTMLFormElement;
                  if (form) {
                    // Cria ou atualiza um input hidden para indicar o reenvio
                    let resendInput = document.getElementById('resendCodeInput') as HTMLInputElement;
                    if (!resendInput) {
                      resendInput = document.createElement('input');
                      resendInput.type = 'hidden';
                      resendInput.id = 'resendCodeInput';
                      resendInput.name = 'resendCode';
                      form.appendChild(resendInput);
                    }
                    resendInput.value = 'true';
                    setLoading(true);
                    form.submit();
                  }
                }}
                sx={{
                  color: '#0056b3',
                  textDecoration: 'none',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#C49602'
                  }
                }}>
                Solicitar novo código
              </Typography>
            </Box>

            <Divider sx={{ margin: "20px 0px" }}></Divider>
            <Box sx={{ display: 'flex', justifyContent: 'left', columnGap: '5px', marginTop: '20px' }}>
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
          </Box>
        </form>
      </CardContent>
    </EmailLoginOtp>
  );
};

export { EmailOtp };