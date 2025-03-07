import { Link } from "react-router-dom"

import { type Posts } from "../types";


const Post = (props: Posts) => {
    
    return (
        <>      
        <Link to={`posts/${props.slug}`} key={props.id} className="card">
            <img src={props.image} alt="" />
            <article>
                <p className="entertainment-category">Entertainment</p>
                <h3>{props.title}</h3>
                <p>
                    {props.truncated_content}
                </p>
            </article>
        </Link>
        </>
    )
}

export default Post;