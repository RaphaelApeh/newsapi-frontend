
export type User = {
    username: string
    email? : string
    get_full_name? : string
}

export interface Posts {
    user: User
    id: number
    title : string
    content: string
    slug: string
    image: string
    comments?: Comment[]
    active: boolean
    timestamp?: string
}

export interface Comment {
    user: User
    content: string
    timestamp: string
}
