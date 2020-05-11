import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import '../main.css'
const BlogItem = (props) =>{
    return(
        <Layout title={props.response.topic} {...props}>
        <section className="section blog-post forum">
        <div className="container">

            <div className="content">

                <div className="columns is-centered">
                  <div className="column">

                          <h1 className="title has-text-centered">
                          {props.response.topic}
                          </h1>

                          <div className="columns is-centered is-mobile">
                            <div className="column is-narrow">

                              <div className="author-info">
                                <div className="columns is-mobile is-vcentered">
                                  <div className="column is-narrow">
                                    <img src={props.response.featuredImage} />
                                  </div>
                                  <div className="column">
                                    <div className="author-name">The Academist</div>
                                    <div className="date">
                                    <Moment format="MMM Do, YYYY">
                                    {props.response.createdAt}
                                    </Moment></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="social has-text-centered">
                              <a><img className="right-margin" src="/static/images/share1.png" /></a>
                              <a><img className="right-margin" src="/static/images/share2.png" /></a>
                              <a><img className="right-margin" src="/static/images/share3.png" /></a>
                              <a><img className="right-margin" src="/static/images/share4.png" /></a>
                              <a><img className="right-margin" src="/static/images/share5.png" /></a>
                          </div>

                          <div className="blog-image has-text-centered">
                            <img src={props.response.featuredImage} />
                          </div>

                          <div className="blog-post-text" dangerouslySetInnerHTML={{__html: props.response.content}}></div>                                                    

                  </div>
                </div>
            </div>
        </div>
    </section>

        </Layout>
    );
}
BlogItem.getInitialProps = async ({req,query}) => {
    const auth =  await authInitialProps()({req}).auth;
    const resp = await fetch(`http://localhost:4000/api/blog/${query.id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors'
    })
    const response = await resp.json()
    return {auth, response}
    
  }
export default BlogItem;