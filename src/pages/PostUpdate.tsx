import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getPost } from '../helpers/api'
import { useNavigate, useParams } from 'react-router-dom'
import NarBar from '../components/NarBar'
import Footer from '../components/Footer'

export const PostUpdate: React.FC = () => {
  const { slug } = useParams()
  // const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["updatepost"],
    queryFn: () => getPost(String(slug), 2)
  })
  console.log(data)
  if (isLoading) return (
    <div className="preloader">
        <div></div>
        <div>Loading....</div>
    </div>
  )
  return (
    <>
      <NarBar/>
      <form className='mt-12 mb-12'>
        <input className='mt-4 form-control' type="text" value={data.title} />
        <textarea value={data.content} className='mt-4 form-control'></textarea>
        {/* work on it later */}
        {/* <select className='mb-4 form-control' >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
        </select> */}
        <input type="file" className='mt-4 form-control' />
          <button className='mt-4 btn btn-success'>Update</button>
      </form>
      <Footer/>
    </>
  )
}
