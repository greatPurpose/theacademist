import {errorBlog, receiveBlog, requestBlog, receiveSingleBlog, requestSingleBlog, errorSingleBlog} from '../actions/blog';
import fetch from 'isomorphic-unfetch';

export function getBlogCall(url, offset){
    return (dispatch) => {
        dispatch(requestBlog())
        fetch(`${url}`, {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                console.log(json)
                dispatch(receiveBlog(json))
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorBlog(error.message)));
        }
}

export function getSingleBlogCall(url, id){
    return (dispatch) => {
        dispatch(requestSingleBlog())
        fetch(`${url}`.replace('{blog_id}', id), {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveSingleBlog(json))
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorSingleBlog(error.message)));
        }
}
