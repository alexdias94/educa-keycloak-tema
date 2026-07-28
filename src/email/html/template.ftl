<#--
  WARNING: Before modifying this file, run the following command:
  
  $ npx keycloakify own --path "email/html/template.ftl"
  
  This file is provided by @keycloakify/email-native version 260007.0.0.
  It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
-->

<#macro emailLayout>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333333;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 900px;
            padding: 20px;
        }
        .email-header {
            text-align: center;
            border-bottom: 1px solid #dddddd;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .email-header img {
            max-height: 50px;
        }
        .email-body {
            padding: 10px 0;
            font-size: 14px;
            line-height: 1.8;
        }
        .email-footer {
            border-top: 1px solid #dddddd;
            padding-top: 15px;
            margin-top: 30px;
            font-size: 12px;
            color: #666666;
            text-align: center;
        }

        .email-footer img {
            max-height: 25px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Cabeçalho com a Logo / SVG -->
        <div class="email-header">
            <img 
                src="${url.resourcesUrl}/img/educa_logo.png"
                alt="Educa"
            />
        </div>

        <!-- Conteúdo dinâmico de cada e-mail do Keycloak -->
        <div class="email-body">
            <#nested>
        </div>

        <!-- Rodapé -->
        <div class="email-footer">
            <img 
                src="${url.resourcesUrl}/img/logo-aet.png"
                alt="Educa"
            />
        </div>
</body>
</html>
</#macro>