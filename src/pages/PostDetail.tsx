import { useParams } from "react-router-dom"
import { BASE_API_ENDPOINT } from "../helpers/api"
import { useEffect, useState } from "react";
import { type Posts } from "../types";
import NarBar from "../components/NarBar";
import Footer from "../components/Footer";


export const PostDetail = ()=> {

    const { slug } = useParams()
    const [page, setPage] = useState<Posts>({
        user: {
            username: "",
            email: "",
            get_full_name: ""
        },
        id: 0,
        title : "",
        truncated_content: "",
        content: "",
        slug: "",
        image: "",
        comments: [],
        active: true,
        timestamp: ""
    })

    const [loading, setloading] = useState<boolean>(true)

    useEffect(()=> {
    
        getPost()
    
    }, [])

    const getPost = async ()=>{
        try{
            const response = await fetch(`${BASE_API_ENDPOINT}posts/${slug}/`);
            const data = await response.json();
            setPage(data)
            if (response.status >= 400) setloading(false)
            if (loading) return <h1>No Content</h1>
        }catch(error){
            console.log(error)
        }
    
    }
    if (!loading) return <h1>No Content</h1>
    return (
        <>
        <NarBar/>
            {loading ?
            <div className="container">
            <section className="article-page">
                <article>
                    <img src={page.image} alt="" />
                    <h2>{page.title}</h2>
                    <div>
                        <p>
                            <i className="fas fa-user fa-1x"></i> Written By {page.user.username} {page.timestamp}
                        </p>
                        <p className="entertainment-category">Entertainment</p>
                    </div>
                    <p>{page.content}</p>
                </article>
    
                <article>
                    <h3>CATEGORIES</h3>
                    <ul>
                        <li>Sports</li>
                        <li>Entertainment</li>
                        <li>Technology</li>
                        <li>Fashion</li>
                        <li>Shopping</li>
                    </ul>
                </article>
    
                <article>
                    <h3>JOIN OUR CLUB</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, id?
                    </p>
                    <a href="#">Join Now</a>
                </article>
            </section>
        </div> : "No Content"}
        <Footer/>
        </>
    )
}