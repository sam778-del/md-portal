'use client'

import ErrorPage from './error'

export default function GlobalErrorPage({
    error,
}: {
    error: Error & { digest?: string }
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <ErrorPage error={error} />
            </body>
        </html>
    )
}
