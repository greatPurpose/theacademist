import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import '../main.css'
const ForumPost = (props) =>{
    return(
        <Layout title="Forum Details" {...props}>
             <section className="section forum">
        <div className="container">

            <h3 className="title">{props.response.topic}</h3>

            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
              <ul>
                <li><a href="#">Our Forum</a></li>
                <li className="is-active"><a href="#" aria-current="page">{props.response.topic}</a></li>
              </ul>
            </nav>

            <div className="post content">

                    <h4 className="post-title">Julius R. and Patricia A. Krevans Fellowship</h4>

                    <div className="post-text" dangerouslySetInnerHTML={{__html: props.response.content}}></div>

                    <div className="post-footer columns is-vcentered">

                      <div className="column author-info is-4">
                        <div className="columns is-mobile is-vcentered">
                          <div className="column is-narrow">
                            <img src="images/forum_avatar.png" />
                          </div>
                          <div className="column">
                            <div className="author-name">The Academist</div>
                            <div className="date">
                            <Moment format="MMM Do, YYYY">
                                    {props.response.createdAt}
                                    </Moment>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="column"></div>

                      <div className="column is-pulled-right is-narrow">
                        <span className="comments">{props.response.replies.length}</span>
                        <a className="button yellowBtn is-hidden-tablet">Discuss</a>
                      </div>
                      
                    </div>
            </div>

            <div className="columns">
              <div className="column has-text-centered">
                <span className="comments-count">{props.response.replies.length} comments</span>
              </div>
            </div>

            {props.response.replies.map((reply)=>
            <div className="comment content">

                    <div className="comment-header columns is-mobile is-vcentered">

                      <div className="column author-info is-8">
                        <div className="columns is-mobile is-vcentered">
                          <div className="column is-narrow">
                            <img src="images/forum_avatar.png" />
                          </div>
                          <div className="column">
                            <div className="author-name">{reply.firstName} {reply.lastName}</div>
                            <div className="date">November 23, 2019</div>
                          </div>
                        </div>
                      </div>

                      <div className="column"></div>

                      <div className="column is-pulled-right is-narrow">
                        <a className="button yellowBtn">Report</a>
                      </div>
                      
                    </div>


                    <div className="comment-text">
                    <p>{reply.content}</p>  
                    </div>

                    <div className="comment-footer columns is-mobile is-vcentered">

                      <div className="column"></div>

                      
                    </div>
            </div>
            )}
            
            <div className="add-comment content">

                    <div className="comment-header columns is-mobile is-vcentered">

                      <div className="column author-info is-8">
                        <div className="columns is-mobile is-vcentered">
                          <div className="column is-narrow">
                            <img src="images/forum_avatar.png" />
                          </div>
                          <div className="column">
                            <div className="author-name">The Academist</div>
                            <div className="date">Signed by</div>
                          </div>
                        </div>
                      </div>

                      <div className="column"></div>

                      <div className="column is-pulled-right is-narrow">
                        <a className="button yellowBtn">Send</a>
                      </div>
                      
                    </div>

                    <div className="add-comment-block">
                        <textarea className="textarea" placeholder="Write..."></textarea>
                    </div>

            </div>


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
    </section>

        </Layout>
    );
}
ForumPost.getInitialProps = async ({req,query}) => {
    const auth =  await authInitialProps()({req}).auth;
    const resp = await fetch(`http://localhost:4000/api/forum/${query.id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors'
    })
    const response = await resp.json()
    return {auth, response}
    
  }
export default ForumPost;