import "server-only"

import { ApplicationSearchParamsSchemaType } from "@/validators/application"
import { applications } from "@/data/application"
import { unstable_cache } from "@/lib/unstable-cache"

export async function getApplications(input: ApplicationSearchParamsSchemaType) {
    return unstable_cache(
        async () => {
            try {
                // query real db to get applications
                let filteredApplications = applications

                if (input.assignee || input.status) {
                    filteredApplications = applications.filter((el) => {
                        if (input.assignee && input.status) {
                            return el.assignee?.includes(input.assignee) && el.status === input.status
                        } else if (input.assignee) {
                            return el.assignee?.includes(input.assignee)
                        } else if (input.status) {
                            return el.status === input.status
                        }
                        return true
                    })
                }

                return filteredApplications
            } catch {
                return []
            }
        },
        [JSON.stringify(input)],
        { tags: ["applications"] },
    )()
}

export async function getApplicationsAssignees() {
    return unstable_cache(
        async () => {
            try {
                // query real db to get applications assignees
                return [
                    ...new Set(
                        applications.filter((el) => el.assignee?.length).map((application) => application.assignee!),
                    ),
                ]
            } catch {
                return []
            }
        },
        [],
        { tags: ["applications/assignees"] },
    )()
}
