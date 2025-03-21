import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPost, updatePost } from '../helpers/api'
import { useNavigate, useParams } from 'react-router-dom'
import NarBar from '../components/NarBar'
import Footer from '../components/Footer'
import type { PostCreation, Posts } from '../types'
import { useForm } from 'react-hook-form'
import { STATUS } from '../helpers/data'

export const PostUpdate: React.FC = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["updatepost"],
    queryFn: () => getPost(String(slug), 2)
  })
  const mutation = useMutation({
    mutationFn: (data: Posts) => updatePost(String(slug), data),
    onSuccess: () => navigate(`posts/${data.slug}`)
  })
  const { register, handleSubmit } = useForm<PostCreation>()  
  if (isLoading) return (
    <div className="preloader">
        <div></div>
        <div>Loading....</div>
    </div>
  )
  const onSubmit: any = (data: Posts) => {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("content", data.content)
      formData.append("image", data.image[0])
      //@ts-ignore
      formData.append("status", data.status)
      //@ts-ignore
      mutation.mutate(FormData)
  }
  return (
    <>
      <NarBar/>
      {mutation.isError ? (
          <div className='alert alert-danger'>
            <small>{mutation.error?.message}</small>
          </div>
      ): ""}
      <form className='mt-12 mb-12' onSubmit={handleSubmit(onSubmit)}>
        <input className='mt-4 form-control' {...register("title")} type="text" value={data.title} />
        <textarea {...register("content")} value={data.content} className='mt-4 form-control'></textarea>
        <select className='mb-4 form-control' {...register("status")}>
          {STATUS.map(option => (
            <option key={option.id} value={option.name.toLowerCase()}>{option.name}</option>
          ))}
        </select>
        <input type="file" {...register("image")} className='mt-4 form-control' />
        {/* <img src={data.image} width={5} /> */}
          {mutation.isPending ? (
            <button className='mt-4 btn btn-secondary'>Updating ....</button>
          ): (
            <button className='mt-4 btn btn-success'>Update</button>
          )}
      </form>
      <Footer/>
    </>
  )
}
