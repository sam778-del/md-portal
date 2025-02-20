import { createSearchParamsCache, parseAsBoolean, parseAsString, parseAsStringEnum } from "nuqs/server"

export const applicationSearchParams = {
    myApplications: parseAsBoolean.withDefault(false),
    assignee: parseAsString,
    status: parseAsString,
}

export const applicationSearchParamsCache = createSearchParamsCache(applicationSearchParams)

export type ApplicationSearchParamsSchemaType = Awaited<ReturnType<typeof applicationSearchParamsCache.parse>>
