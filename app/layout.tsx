import { getServerSession } from 'next-auth'
import { getAuthOptions } from '../auth-config'
import SignInRedirect from './components/SignInRedirect'
import './globals.css'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { Metadata } from 'next'

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: ".Vizo",
}

interface LayoutProps {
    children: React.ReactNode
    params: Promise<{
        locale: string
    }>
}

export default async function AppLayout({ children, params }: LayoutProps) {
    const authOptions = await getAuthOptions()
    const session = await getServerSession(authOptions)
    const { locale } = await params

    return (
        <html lang={locale} className={`${inter.variable}`}>
            <body className="min-h-screen bg-background font-sans antialiased" id="__app_root">
               <NuqsAdapter>{children}</NuqsAdapter>
            </body>
        </html>
    )
}