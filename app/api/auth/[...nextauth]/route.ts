import NextAuth from 'next-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { getAuthOptions } from '../../../../auth-config'

const clearCookieOptions = 'Max-Age=-1; Path=/; Secure; HttpOnly;'

async function auth(
    request: NextRequest,
    { params }: { params: Promise<{ nextauth: string[] }> },
) {
    const authOptions = await getAuthOptions()
    const url = new URL(request.url)
    const nextauthParams = await params

    if (request.method === 'GET' && url.pathname === '/api/auth/signout') {
        return signout()
    }

    return NextAuth(request, { params: nextauthParams }, authOptions)
}

const signout = async () => {
    try {
        const cookieStore = await cookies()
        const allCookies = cookieStore.getAll()
        let setCookies = ''

        // Process auth cookies
        for (const cookie of allCookies) {
            if (
                [
                    'next-auth.session-token.0',
                    'next-auth.session-token.1',
                ].includes(cookie.name)
            ) {
                setCookies += `${cookie.name}=; ${clearCookieOptions}`
            }
        }

        return new Response('', {
            status: 200,
            headers: {
                'Set-Cookie': setCookies,
            },
        })
    } catch (error) {
        console.error('Signout error:', error)
        redirect('/')
    }
}

export { auth as GET, auth as POST }
