import { getRequestConfig } from 'next-intl/server'

export let messages = {}

export default getRequestConfig(async ({ locale }: { locale: string }) => {
    messages = (await import(`./messages/${locale}.json`)).default

    return { messages }
})

export const defaultLocale = 'he'
export const locales = ['en', defaultLocale]
