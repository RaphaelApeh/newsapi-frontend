import { useParams } from "react-router-dom";
import NarBar from "../components/NarBar";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../helpers/api";


export const PostDetail = ()=> {

    const { slug } = useParams()
    
    const { data, isPending, isLoading, isError } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost(String(slug)),
        staleTime: 5000
    })
    
    if (isPending || isLoading) return <h1>Loading .....</h1>
    if (isError) return <h1>Something went wrong :(</h1>
    return (
        <>
        <NarBar/>
            {
            <div className="container">
            <section className="article-page">
                <article>
                    <img src={data.image} alt="" />
                    <h2>{data.title}</h2>
                    <div>
                        <p>
                            <i className="fas fa-user fa-1x"></i> Written By {data.user.username} {data.timestamp}
                        </p>
                        <p className="entertainment-category">Entertainment</p>
                    </div>
                    <p>{data.content}</p>
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
        </div>}
        <Footer/>
        </>
    )
}