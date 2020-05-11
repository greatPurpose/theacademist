import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import { authInitialProps } from "../lib/auth";
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';
import '../main.css'
import Link from 'next/link'

export default class Blog extends React.Component{
    static async getInitialProps({ req, res, query }) {
        let posts;
        let auth;
    
        try {
          const response = await fetch(
            `https://theacademist.com/api/v1/blog`
          );
          posts = await response.json();
          auth =  await authInitialProps()({req}).auth;
        } catch (err) {
          console.log(err);
          posts = [];
        }
    
        return { posts, auth };
      }
    render(){
        const {posts} = this.props
        return(
            <Layout title="Blog" activeLink="blog" {...this.props}>
            <section className="section knowledge">
        <div className="container content set-width">
          <div className="columns is-centered">

            <div className="column">

              <h1 className="title has-text-centered">Our Blog</h1>

              {posts.rows.map((post, id)=>
              
              <div key={id} className="columns knowledge-block">
              <Link as={`/blog/${post.id}/${post.urlParam}`} href={`/post?id=${post.id}`}>
                <div style={{cursor: "pointer"}} className="column">
                <img className="knowledge-image" src={post.featuredImage} />
                </div>
                </Link>
                
                <div className="column is-two-thirds">
                <Link as={`/blog/${post.id}/${post.urlParam}`} href={`/post?id=${post.id}`}>
                <a><TextTruncate
                    line={3}
                    element="h3"
                    truncateText="…"
                    text={post.topic}
                    /></a>
                    </Link>
                    
                    <Link as={`/blog/${post.id}/${post.urlParam}`} href={`/post?id=${post.id}`}>
                    <TextTruncate
                    line={3}
                    element='p'
                    truncateText="…"
                    text={`${post.content}`.replace(/<[^>]+>/g, '')}
                    />
                    </Link>
                    <div className="columns">

                        <div className="column with-circle">
                            <div>
                              <h5>The Academist</h5>
                              <p>
                              <Moment format="MMM Do, YYYY">
                                    {post.createdAt}
                                </Moment>
                              </p>
                            </div>
                        </div>

                        <div className="column is-narrow is-right">
                            <div className="social">
                                <a><img className="right-margin" src="static/images/share1.png" /></a>
                                <a><img className="right-margin" src="static/images/share2.png" /></a>
                                <a><img className="right-margin" src="static/images/share3.png" /></a>
                                <a><img className="right-margin" src="static/images/share4.png" /></a>
                                <a><img src="static/images/share5.png" /></a>
                            </div>                      
                        </div>
                    </div>
                </div>            
              </div>
              )}
            </div>
          </div>
        </div>

        <div className="columns is-mobile is-centered">
          <div className="column is-7-tablet is-5-desktop is-3-fullwidth is-12-mobile">


              <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                <a className="pagination-previous">&lsaquo;</a>
                <a className="pagination-next">&rsaquo;</a>
                <ul className="pagination-list">
                  <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
                  <li><a className="pagination-link is-current" aria-label="Page 2" aria-current="page">2</a></li>
                  <li><a className="pagination-link " aria-label="Goto page 3">3</a></li>
                  <li><span className="pagination-ellipsis">&hellip;</span></li>
                  <li><a className="pagination-link" aria-label="Goto page 100">100</a></li>
                </ul>
              </nav>


          </div>
        </div>


    </section>

            </Layout>
        );
    }
}