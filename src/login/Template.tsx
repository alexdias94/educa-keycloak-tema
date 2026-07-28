import { Box, Card, Typography } from "@mui/material";
import { CustomTemplateProps } from './types'
import cover from "./../assets/background-login.jpg"
import aetLogo from "./../assets/logo-aet.svg"
import { LanguageSelect } from "./assets/components/LanguageSelect";

type KeycloakThemeFile = "login.ftl" | "login-reset-password.ftl" | "login-update-password.ftl" | "login-config-totp.ftl" | "login-otp.ftl" | "email-otp-code.ftl";

const Template = (props: CustomTemplateProps<KeycloakThemeFile>) => {
  const { children, kcContext, i18n } = props
  const { realm } = kcContext
  const { internationalizationEnabled } = realm
  const { enabledLanguages } = i18n

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
        <Box sx={{ width: '400px', paddingLeft: '50px'}}>
            <Card sx={{ p: 2 }}>
              {children}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant='caption' sx={{ paddingLeft: '8px', fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
                  {realm.displayName}
                </Typography>
                {!!enabledLanguages?.length && internationalizationEnabled && (
                  <LanguageSelect i18n={i18n} sx={{ ml: 'auto' }} />
                )}
              </Box>
            </Card>
        </Box>
      </Box>
      <Box 
        component="footer" 
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 'auto',
            py: 2
        }}>
          <img src={aetLogo} 
            alt="AET Logo"
            style={{ height: '28px', width: 'auto' }}
          />
      </Box>
    </Box>
  )
}

export { Template }
export { Template as LoginResetPassword }
export { Template as LoginUpdatePassword }
export { Template as LoginConfigTotp }
export { Template as LoginOtp }
export { Template as EmailLoginOtp }