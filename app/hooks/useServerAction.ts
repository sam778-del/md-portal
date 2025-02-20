import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { ApiResponse } from '../api'

export const useServerAction = <T extends unknown[], R>(
    action: (...args: T) => Promise<ApiResponse<R>>,
): {
    runAction: (...args: T) => Promise<ApiResponse<R>>
    isPending: boolean
    isError: boolean
    resetAction: () => void
} => {
    const [isPending, startTransition] = useTransition()
    const [response, setResponse] = useState<ApiResponse<R> | undefined>()
    const [isFinished, setIsFinished] = useState(false)
    const [isError, setIsError] = useState(false)

    const resolveRef = useRef<
        ((value: ApiResponse<R> | PromiseLike<ApiResponse<R>>) => void) | null
    >(null)

    useEffect(() => {
        if (!isFinished || !resolveRef.current) return

        resolveRef.current(response as ApiResponse<R>)
        resolveRef.current = null
    }, [response, isFinished])

    const resetAction = () => {
        setIsFinished(false)
        setIsError(false)
        setResponse(undefined)
    }

    const runAction = useCallback(
        (...args: T): Promise<ApiResponse<R>> => {
            return new Promise<ApiResponse<R>>((resolve) => {
                resolveRef.current = resolve

                startTransition(() => {
                    resetAction()
                    action(...args)
                        .then((res) => {
                            if ('error' in res) {
                                setIsError(true)
                            }
                            setIsFinished(true)
                            setResponse(res)

                            return res
                        })
                        .catch((err) => {
                            console.error(err)
                            const errorResponse = {
                                error: err.message,
                                statusCode: 500,
                            }
                            setIsFinished(true)
                            setIsError(true)
                            setResponse(errorResponse)
                        })
                })
            })
        },
        [action],
    )

    return {
        runAction,
        isPending,
        isError,
        resetAction,
    }
}
