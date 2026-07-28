<#--
  WARNING: Before modifying this file, run the following command:
  
  $ npx keycloakify own --path "email/html/email-otp.ftl"
  
  This file is provided by @keycloakify/email-native version 260007.0.0.
  It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
-->

<#import "template.ftl" as layout>
<@layout.emailLayout>
    ${kcSanitize(msg("emailOtpCodeBodyHtml", nomePersona, codigoOtp))?no_esc}
</@layout.emailLayout>
