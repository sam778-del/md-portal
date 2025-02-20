export type ViewApplicationModalStoreType = {
    isOpen: boolean
    applicationId?: string

    onOpen: (applicationId: string) => void
    onClose: () => void
}
