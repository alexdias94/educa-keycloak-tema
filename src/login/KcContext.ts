import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
};

export type KcContextExtensionPerPage = {
    "email-otp-code.ftl": {
        url: {
            loginAction: string;
            loginRestartUrl: string;
        };
        message?: {
            type: "success" | "error" | "warning" | "info";
            summary: string;
        };
        messagesPerField: {
            existsError: (fieldName: string) => boolean;
            getFirstError: (fieldName: string) => string;
        };
    };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
