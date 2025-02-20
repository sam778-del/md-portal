'use client'
import { signIn } from 'next-auth/react'

export default function SignInRedirect() {
    if (typeof window != 'undefined' && window.location.href) {
        void signIn('cognito', { callbackUrl: window.location.href })
    }

    return null
}
