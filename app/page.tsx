import { getApplications, getApplicationsAssignees } from "@/server/queries/application"

import { DataTable } from "@/app/components/ui/data-table"
import Navbar from "@/app/components/home/nav-bar"
import { type SearchParams } from "@/types"
import ViewApplicationModal from "@/app/components/home/view-application-modal"
import { applicationListColumns } from "@/app/components/home/application-list-columns"
import { applicationSearchParamsCache } from "@/validators/application"

interface IProps {
    searchParams: Promise<SearchParams>
}

export default async function Home(props: IProps) {
    const searchParams = await props.searchParams

    const search = applicationSearchParamsCache.parse(searchParams)
    const applications = await getApplications(search)
    const applicationAssignees = await getApplicationsAssignees()

    return (
        <div className="">
            <Navbar assignees={applicationAssignees} />
            <div className="p-6">
                <DataTable columns={applicationListColumns} data={applications} />
            </div>

            <ViewApplicationModal />
        </div>
    )
}
