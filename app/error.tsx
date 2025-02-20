'use client'
export default function ErrorPage({
    error,
}: {
    error: Error & { digest?: string }
}) {
    return (
        <div>
            <h2>Sorry, something went wrong</h2>
            <h2>מצטערים, נתקלנו בשגיאה</h2>
            {error.message && <p>{error.message}</p>}
        </div>
    )
}
