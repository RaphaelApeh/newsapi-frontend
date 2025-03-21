import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPost } from '../helpers/api'
import { useParams } from 'react-router-dom'
import NarBar from '../components/NarBar'
import Footer from '../components/Footer'
import type { PostCreation } from '../types'
import { useForm } from 'react-hook-form'
import { STATUS } from '../helpers/data'

export const PostUpdate: React.FC = () => {
  const { slug } = useParams()
  // const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["updatepost"],
    queryFn: () => getPost(String(slug), 2)
  })
  const { register, handleSubmit } = useForm<PostCreation>()  
  if (isLoading) return (
    <div className="preloader">
        <div></div>
        <div>Loading....</div>
    </div>
  )
  const onSubmit = <T,>(data: T) => {
    console.log(data)
  }
  return (
    <>
      <NarBar/>
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
          <button className='mt-4 btn btn-success'>Update</button>
      </form>
      <Footer/>
    </>
  )
}
