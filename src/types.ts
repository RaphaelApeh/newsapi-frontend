
export type User = {
    username: string
    email? : string
    get_full_name? : string
}

export interface Posts {
    user: User
    id: number
    title : string
    truncated_content: string
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


export interface UserRegister {
    username: string
    email: string
    password: string
    password2: string
}