import { useNavigate, useParams } from "react-router-dom";
import NarBar from "../components/NarBar";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../helpers/api";
import { useState } from "react";
import { Comment } from "../types";


export const PostDetail = ()=> {

    const { slug } = useParams()
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const { data, isPending, isLoading, isError } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost(String(slug)),
        staleTime: 5000
    })
    
    if (isPending || isLoading) return (
    <div className="preloader">
        <div></div>
        <div>Loading....</div>
    </div>
    )
    if (isError) navigate("/login")
    return (
        <>
        <NarBar />
            <div className="container">
            <section className="article-page">
                <article>
                    <img src={data.image} alt="" />
                    <h2>{data.title}</h2>
                    <div>
                        <p>
                            <i className="fas fa-user fa-1x"></i> Written By {data.user.username} {data.timestamp}
                        </p>
                        {data.can_edit_or_update ? (
                            <>
                            <p className="delete">Delete</p>
                            <p className="update">Update</p>
                            </>
                        ): ""}
                    </div>
                    <p>{data.content}</p>
                </article>
    
                <article>
                    <h3>Comments</h3>
                    <ul>
                        {data.comments.length > 0 ? data.comments.map((comment: Comment) => 
                        <li key={comment.id}>{comment.user.username} {">"} {comment.content}</li>
                        ) : "No Comments"}
                    </ul>
                </article>
    
                <article>
                    <h3>Add Comment ...</h3>
                    <input type="text" className="mb-2 form-control" />
                    <button className="btn btn-success">Add</button>
                </article>
            </section>
        </div>
        <Footer/>
        </>
    )
}