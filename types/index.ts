export type ApplicationType = {
    applicationId: string // Unique identifier for the application
    customerId: string // Unique identifier for the customer
    status: string // Possible statuses
    submittedAt: string // ISO 8601 timestamp for submission
    assignee: string | null // Assigned person's name or null if unassigned
}

export type SearchParams = Record<string, string | string[] | undefined>
