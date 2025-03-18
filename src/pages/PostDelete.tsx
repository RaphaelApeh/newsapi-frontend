// import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPost } from '../helpers/api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const PostDelete = () => {
    const { slug }  = useParams<string>()

    const navigate = useNavigate()

    const { data, isError } = useQuery({
        queryKey: ["delete-post"],
        queryFn: () => getPost(String(slug), 0)
    })
    
    const mutation = useMutation({
        mutationFn: () => deletePost(String(slug)),
        onSuccess: () => navigate("/")
    })
    if (mutation.isError || isError){
        navigate("/")
    }
    const handleOnDelete = () => {
        mutation.mutate()
    }

    return (
        <>
        <h1 className='text-bold'>Are you sure you want to delete "{data.title}"?</h1>
        {mutation.isPending ? (
            <button className='btn btn-success'>Submitting</button>
        ): (
            <button onClick={handleOnDelete} className='btn btn-secondary'>Submit</button>
        )}
        </>
    )
}
