export type GalleryType = {
    class: string,
    name: string,
    id: number
}

export type ProfileType = {
    id: number,
    username: string,
    password: string,
    email: string,

}

export type ContactType = {
    id: number,
    name: string,
    "phone": number,
    "email": string,
    "photo": string | null
}
export type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}