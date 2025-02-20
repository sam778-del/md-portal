'use server'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '../auth-config'

export type ApiErrorResponse = {
    error: string
    statusCode: number
}

type ApiSuccessResponse<T> = {
    data: T
    statusCode: number
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>

if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set.')
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')

const authorizedFetch = async <T>(
    url: string,
    options?: RequestInit,
): Promise<ApiResponse<T>> => {
    const authOptions = await getAuthOptions()
    const session = await getServerSession(authOptions)

    if (!session) {
        return {
            error: 'Unauthorized',
            statusCode: 401,
        } as ApiErrorResponse
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: session.idToken,
        },
    })

    if (response.status !== 200) {
        try {
            const errorData = await response.json()

            return {
                error: errorData.error || `HTTP error ${response.status}`,
                ...errorData,
            } as ApiErrorResponse
        } catch (e) {
            return {
                error: `Failed to fetch ${url}: ${response.statusText}, ${response.status}`,
                statusCode: response.status,
            } as ApiErrorResponse
        }
    }

    try {
        const data = await response.json()

        return { data, statusCode: response.status } as ApiSuccessResponse<T>
    } catch (e) {
        return {
            error: 'Empty response',
            statusCode: response.status,
        } as ApiErrorResponse
    }
}

// Example API function
export const getSomeData = () => {
    return authorizedFetch<{ id: string; foo: string }>(
        `${BASE_URL}/controller/endpoint`,
    )
}
