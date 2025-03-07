import { Link } from "react-router-dom"

import { type Posts } from "../types";


const Post = (props: Posts) => {
    
    return (
        <>      
        <Link to={`posts/${props.slug}`} className="card">
            <img src={props.image} alt="" />
            <article>
                <p className="entertainment-category">Entertainment</p>
                <h1>{props.title}</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
                    nisi neque eum libero maiores voluptatem repudiandae quos
                    perspiciatis, reiciendis dolor!
                </p>
            </article>
        </Link>
        </>
    )
}

export default Post;