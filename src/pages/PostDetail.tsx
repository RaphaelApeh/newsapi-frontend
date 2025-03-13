import { useNavigate, useParams } from "react-router-dom";
import NarBar from "../components/NarBar";
import Footer from "../components/Footer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateComment, getPost } from "../helpers/api";
import { Comment } from "../types";
import { useForm } from "react-hook-form";
import { useState } from "react";


export const PostDetail = ()=> {

    const { slug } = useParams<string>();

    const [count, setCount] = useState<number>(2);

    const stringSlug = String(slug);

    const navigate = useNavigate();

    const queryClient = useQueryClient() 

    const { data, isPending, isLoading, isError } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost(stringSlug, count)
    })
    console.log(count)
    const {register, handleSubmit, reset} = useForm<Comment>()

    const mutation = useMutation({
        mutationFn: (data: Comment) => CreateComment(stringSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["post"]
            })
        },
    });
    
    const onSubmit = (data: Comment) => {
        
        mutation.mutate(data);
        reset()
    }
    const handleCount = () => {
        setCount(prev => prev + 1)
        queryClient.invalidateQueries({
            queryKey: ["post"]
        })
    }
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
        {mutation.isError ? (
            <div className="alert alert-danger">{mutation.error.message}</div>
        ): ""}
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
                    {data.comment_count !== count ? (
                        <button onClick={handleCount} className="btn btn-outline-success">load more ...</button>
                    ): ""}
                </article>
    
                <article>
                    <h3>Add Comment ...</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("content", {required: "Required"})} type="text" className="mb-2 form-control" />
                        <button className="btn btn-success">Add</button>
                    </form>
                </article>
            </section>
        </div>
        <Footer/>
        </>
    )
}