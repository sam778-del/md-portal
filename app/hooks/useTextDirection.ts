import { getLocale } from 'next-intl/server'
import { isRtlLang } from 'rtl-detect'

export default async function useTextDirection(locale: string) {
    const defaultLocale = await getLocale()
    if (!locale) locale = defaultLocale

    return isRtlLang(locale) ? 'rtl' : 'ltr'
}
