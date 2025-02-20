import { ViewApplicationModalStoreType } from "@/types/store"
import { create } from "zustand"

const useViewApplicationModal = create<ViewApplicationModalStoreType>((set) => ({
    isOpen: false,
    applicationId: undefined,
    onOpen: (applicationId) => set({ isOpen: true, applicationId }),
    onClose: () => set({ isOpen: false, applicationId: undefined }),
}))

export default useViewApplicationModal
