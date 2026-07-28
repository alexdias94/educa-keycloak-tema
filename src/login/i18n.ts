/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";
import en from '../i18n/en/strings';
import es from '../i18n/es/strings';
import ptBr from '../i18n/ptBr/strings';
/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: en,
        es: es,
        "pt-BR": ptBr
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
