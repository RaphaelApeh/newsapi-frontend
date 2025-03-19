// import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost } from '../helpers/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NarBar from '../components/NarBar'
import Footer from '../components/Footer'

export const PostDelete = () => {
    const { slug }  = useParams<string>()

    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => deletePost(String(slug)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["post"]
            })
            navigate("/")
        }
    })
    
    const handleOnDelete = () => {
        mutation.mutate()
    }

    return (
        <>
        <NarBar/>
        {mutation.isError ? (
            <div className='alert alert-danger'>
                <small>{mutation.error?.message}</small>
            </div>
        ): ""}
        <div className='mt-4'>
            <h1 className='mt-4 mb-4 text-center'>Are you sure you want to delete this?</h1>
            {mutation.isPending ? (
                <button className='btn btn-success'>Submitting</button>
            ): (
                <button onClick={handleOnDelete} className='btn btn-secondary'>Submit</button>
            )}
        </div>
        <Footer/>
        </>
    )
}
