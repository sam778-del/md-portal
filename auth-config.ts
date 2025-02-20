import { AuthOptions, TokenSet } from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'

const getEnvVars = () => {
    const envVars = {
        NEXT_PUBLIC_COGNITO_CLIENT_ID:
            process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET,
        COGNITO_ISSUER: process.env.COGNITO_ISSUER,
        NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
        NEXT_PUBLIC_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    }

    const undefinedVars = Object.entries(envVars)
        .filter(([_key, value]) => !value)
        .map(([key]) => key)

    if (undefinedVars.length > 0) {
        console.error(
            `The following environment ${
                undefinedVars.length === 1 ? 'variable is' : 'variables are'
            } not defined:`,
            undefinedVars.join(', '),
        )
        throw new Error('Required environment variables are undefined')
    }

    // assert all env vars are defined
    return envVars as Record<keyof typeof envVars, string>
}

export const getAuthOptions = async (): Promise<AuthOptions> => {
    const {
        NEXT_PUBLIC_COGNITO_CLIENT_ID,
        COGNITO_CLIENT_SECRET,
        COGNITO_ISSUER,
        NEXT_AUTH_SECRET,
        NEXT_PUBLIC_COGNITO_DOMAIN,
    } = getEnvVars()

    return {
        secret: NEXT_AUTH_SECRET,
        providers: [
            CognitoProvider({
                clientId: NEXT_PUBLIC_COGNITO_CLIENT_ID,
                clientSecret: COGNITO_CLIENT_SECRET,
                issuer: COGNITO_ISSUER,
            }),
        ],
        session: {
            strategy: 'jwt',
        },
        callbacks: {
            session: async function ({ session, token }) {
                return {
                    ...session,
                    idToken: token.idToken,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                }
            },
            jwt: async function ({ token, account }) {
                if (account) {
                    // This is an initial login, set JWT tokens.
                    return {
                        ...token,
                        accessToken: account.access_token,
                        idToken: account.id_token,
                        refreshToken: account.refresh_token,
                        expiresAt: account.expires_at,
                        tokenType: 'Bearer',
                    }
                }

                if (!token.expiresAt || Date.now() < token.expiresAt) {
                    // Access/Id token are still valid, return them as is.
                    return token
                }
                // Access/Id tokens have expired, retrieve new tokens using the
                // refresh token
                try {
                    if (!token.refreshToken) {
                        throw new Error('Missing refresh token')
                    }
                    const response = await fetch(
                        `${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`,
                        {
                            headers: {
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                            },
                            body: new URLSearchParams({
                                client_id: NEXT_PUBLIC_COGNITO_CLIENT_ID,
                                client_secret: COGNITO_CLIENT_SECRET,
                                grant_type: 'refresh_token',
                                refresh_token: token.refreshToken,
                            }),
                            method: 'POST',
                        },
                    )

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    return {
                        ...token,
                        accessToken: tokens.access_token,
                        idToken: tokens.id_token,
                        expiresAt:
                            Date.now() + Number(tokens.expires_in) * 1000,
                    }
                } catch (error) {
                    // Could not refresh tokens, return error
                    console.error(
                        'Error refreshing access and id tokens: ',
                        error,
                    )

                    throw new Error('Error refreshing access token')
                }
            },
        },
    }
}
