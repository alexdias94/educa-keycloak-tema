import { JSX, Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Template } from "./Template";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/theme.scss";

import { CustomTemplateProps } from "./types";
import { Login } from "./pages/educa/login";
import { LoginReset } from "./pages/educa/login-reset";
import { PasswordUpdate } from "./pages/educa/password-update";
import { EmailOtp } from "./pages/educa/email-top";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });
    const theme = createTheme({
        cssVariables: true,
        colorSchemes: {
            light: {
                palette: {
                    background: {
                        default: "#f0f0f0",
                    },
                    primary: {
                        main: kcContext.properties.FDN_THEME_PRIMARY_COLOR
                    },
                    secondary: {
                        main: kcContext.properties.FDN_THEME_SECONDARY_COLOR
                    }
                },
            },
        },
    });

    type LoginTemplate = (props: CustomTemplateProps<"login.ftl">) => JSX.Element;
    type LoginResetTemplate = (props: CustomTemplateProps<"login-reset-password.ftl">) => JSX.Element;
    type PasswordUpdateTemplate = (props: CustomTemplateProps<"login-update-password.ftl">) => JSX.Element;
    type EmailOtpTemplate = (props: CustomTemplateProps<"email-otp-code.ftl">) => JSX.Element;

    return (
        <ThemeProvider theme={theme}>
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case 'login.ftl':
                            return (
                                <Login
                                    Template={Template as LoginTemplate}
                                    i18n={i18n}
                                    kcContext={kcContext} />
                            );
                        case "login-reset-password.ftl":
                            return (
                                <LoginReset
                                    Template={Template as LoginResetTemplate}
                                    i18n={i18n}
                                    kcContext={kcContext} />
                            );
                        case "login-update-password.ftl":
                            return (
                                <PasswordUpdate
                                    Template={Template as PasswordUpdateTemplate}
                                    i18n={i18n}
                                    kcContext={kcContext} />
                            );
                        case "email-otp-code.ftl":
                            return (
                                <EmailOtp
                                    Template={Template as EmailOtpTemplate}
                                    i18n={i18n}
                                    kcContext={kcContext}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext as any}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword} />
                            );
                    }
                })()}
            </Suspense>
        </ThemeProvider>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
