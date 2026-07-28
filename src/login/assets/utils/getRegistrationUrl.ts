export const getRegistrationUrl = (urlOrigin: string, clientId: string, urlPadrao: string): string => {
    
    const safeClientId = clientId ?? "";

    // 1. Identifica o ambiente pelo domínio
    // Produção
    if (urlOrigin === "https://sso.web.enfam.jus.br") {
        return "https://educa2.web.enfam.jus.br/academico-externo-web/cadastro-usuario";
    }

    //Desenvolvimento
    if (urlOrigin === "https://sso-dev.web.enfam.jus.br") {
        return "https://educa2-dev.web.enfam.jus.br/academico-externo-web/cadastro-usuario";
    }

    //Hom  e QA
    if (urlOrigin === "https://sso-hom.web.enfam.jus.br") {

        // HOM
        if (safeClientId === "enfam") {
        return "https://educa2-hom.web.enfam.jus.br/academico-externo-web/cadastro-usuario";
        
        // QA
        }  else if (safeClientId === "enfam-qa") {
        return "https://educa2qa-hom.web.enfam.jus.br/academico-externo-web/cadastro-usuario";
        
        } else {
            return urlPadrao;
        }
    }

    return urlPadrao;
};