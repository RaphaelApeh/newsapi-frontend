import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { createPost } from '../helpers/api'
import type { PostCreation } from '../types'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import NarBar from '../components/NarBar'
import { STATUS } from '../helpers/data'

export const PostCreate: React.FC = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("access")
        if (!token){
            navigate("/login")
        }
    }, [])

    const mutation = useMutation({
        mutationFn: (data: PostCreation) => createPost(data),
        onSuccess: () => navigate("/")
    })
    const { register, handleSubmit } = useForm<PostCreation>();

    const onSubmit = (data: PostCreation) => {
        const formData = new FormData()
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("status", data.status);
        formData.append("image", data.image[0]);
        console.log(formData);
        //@ts-ignore
        mutation.mutate(formData)
    }
    return (
        <>
        <NarBar />
        <h1>Create Post 😍</h1>
        {mutation.isError ? (
            <div className='alert alert-danger'>
                {mutation.error?.message}
            </div>
        ) : mutation.isPending ? (
        <div className='alert alert-dark'>
            Sending ...
        </div>
        ): ""}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title")} className='mb-4 form-control' />
            <textarea className='mb-4 form-control' {...register("content")}></textarea>
            <select {...register("status")} className='mb-4 form-control' >
                {STATUS.map((option) => {
                    return <option key={option.id} value={option.name.toLowerCase()}>{option.name}</option>
                })}
            </select>
            <input type="file" {...register("image")} className='mb-4 form-control' />
            {mutation.isPending ? (
                <button className='btn btn-success'>Submitting ...</button>
            ): mutation.isError ? (
                <button className='btn btn-danger'>Error</button>
            ): (
                <button className='btn btn-secondary'>Submit</button>
            )}
        </form>
        </>
    )
}
