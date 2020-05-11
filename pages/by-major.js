import Layout from "../components/Layout";
import '../main.css'
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";

export default class ByMajor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            results: [],
            resultCount: 0,
            isloading: false,
            state: 'All',
            major: 'Accounting',
            country: 'US',
            level: 'Undergraduate',
            offset: 0
        }
    }
    componentDidMount = async() =>{
      console.log("MOunted")
      this.searchNow()
    }
    searchNow = () =>{
        const {state, major, country, level, offset} = this.state;
        fetch(`/api/major`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({state, major, country, level, offset})
        })
        .then(            
            response => response.json()                        
        )
        .then(
            data => {
                if(data.length != 0){
                this.setState({isloading: false, results: [...this.state.results, ...data.rows], resultCount: data.count}, ()=>{
                    console.log(this.state.results)
                })
            }
               
        }
        )
    }
    render(){
        
        return(
        <Layout title="School Search By Major" {...this.props}>
        <section className="section search-block">
        <div className="container">

          <div className="columns is-centered">


            <div className="column">

                  <h1 className="title">Find your best school match</h1>

                  <div className="columns is-centered">

                        <div className="column is-narrow">
                          <div className="content">
                            <div className="long-rounded grey" style={{width: "fit-content"}}>
                                <div className="columns is-mobile">
                                  <div className="column is-narrow">
                                    <p>Search by</p>
                                  </div>
                                  <div className="column">
                                    <input className="input" type="text" placeholder="Major" />
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>

                        <div className="column is-narrow">
                          <div className="content has-text-centered">
                            <a className="button yellowBtn nextBtn">Next</a>
                          </div>
                        </div>

                  </div>
            </div>


          </div>
        </div>
    </section>


    <section className="section search-results-block">
        <div className="container content">

          <div className="columns search-headings is-mobile">

                <div className="column is-narrow is-left">
                  <h3>Results</h3>
                </div>

                <div className="column has-text-centered">
                  <div><span className="total-found">{this.state.resultCount} Schools Found</span></div>

                </div>

                <div className="column is-narrow is-right">

                      <div className="dropdown is-hoverable">
                        <div className="dropdown-trigger">
                          <button className="button grey is-rounded" aria-haspopup="true" aria-controls="dropdown-menu4">
                            <span>Sort by</span>
                            <span className="icon is-small">
                              <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                          </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                          <div className="dropdown-content">
                              <a href="#" className="dropdown-item">
                                GPA
                              </a>
                              <a href="#" className="dropdown-item">
                                Level
                              </a>
                            </div>
                        </div>
                      </div>

                </div>
          </div>

          <div className="search-result long-rounded">

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">Julius R. and Patricia A. Krevans Fellowship</h5>

                </div>
            </div>

            <div className="columns is-mobile">

                <div className="column is-7 has-text-right">
                  <div className="visit-school">
                    <a className="share">
                      <span className="icon">
                        <i className="fas fa-share-alt"></i>
                      </span>
                    </a>
                    <a className="button yellowBtn nextBtn">Visit school</a>
                  </div>
                </div>
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

ByMajor.getInitialProps = async ({req,query}) => {
  const auth =  await authInitialProps()({req}).auth;
  return {auth}
  
}