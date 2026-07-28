import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory"; // Ajuste o caminho relativo conforme a estrutura do seu projeto

const { KcPageStory } = createKcPageStory({ pageId: "email-otp-code.ftl" });

const meta = {
    title: "login/email-otp-code.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const PortuguesBrazil: Story = {
    render: () => <KcPageStory 
        kcContext={{
            locale: {
                currentLanguageTag: "pt-BR"
            }
        }}
    />
};

/**
 * WithError:
 * - Cenário simulando um código OTP inválido ou erro retornado pelo SPI.
 */
export const WithError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                url: {
                    loginAction: "/login-action",
                    loginRestartUrl: "/login-restart"
                },
                message: {
                    type: "error",
                    summary: "Código de acesso inválido ou expirado."
                },
                messagesPerField: {
                    existsError: (field: string) => field === "code",
                    getFirstError: () => "Código inválido"
                }
            }}
        />
    )
};