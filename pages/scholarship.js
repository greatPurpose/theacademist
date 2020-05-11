import Layout from '../components/Layout'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import COUNTRIES from '../helpers/gpa-countries';
import { faPlusCircle, faCalculator, faShareAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Router from 'next/router'
import {getUserCall} from '../calls/user'
import fetch from 'isomorphic-unfetch';
import Modal from '../components/modal'
import {connect} from 'react-redux'
import Select, { components } from 'react-select';
import '../main.css'
import Select1 from "../components/select1";
import Select2 from "../components/select2";
import Select3 from "../components/select3";
import Select4 from "../components/select4";
import Select5 from "../components/select5";
import Select6 from "../components/select6";
import Select7 from "../components/select7";
import Select8 from "../components/select8";

const { Option } = components;
const SelectContainer = ({ children, ...props }) => {
  return (
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
  );
};

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
  <span className="align-flag">
      <img src={props.data.icon} className="dropdownIcon"/>
      &nbsp;
      <span className="aligntext">{children}</span>
    </span>
  </components.SingleValue>
);
const IconOption = (props) => (
  
    <Option {...props}>
    <span className="align-flag">
      <img src={props.data.icon} className="dropdownIcon"/>
      &nbsp;
      <span className="aligntext">{props.data.label}</span>
    </span>
    </Option>
  
);


 class Scholarship extends React.Component{   
    constructor(props){
        super(props)
        this.state = {
            country: '',
            gpa: 0,
            level: '',
            criteria: '',
            major: '',
            applicantCountry: '',
            amount: '',
            offset: 0,
            activePage: 1,
            results: [],
            resultCount: 0,
            isloading: false,
            showConfirm: false,
            confirm: false,
            selected: {},
            currentIndex: 0,
            showSearchBtn: false,
            end: true,
            noCoin: false,
            anim: [
              {
                id: 1,
                tag: <Select4 onSelect={(e)=>this.setCountry(e)}/>
              },
              {
                id: 2,
                tag: <Select2 onSelect={(e)=>this.setLevel(e)}/>
              },
              {
                id: 3,
                tag: <Select1 onSelect={(e)=>this.setGpa(e)}/>
              },
              {
                id: 4,
                tag: <Select5 onSelect={(e)=>this.setCriteria(e)}/>
              },
              {
                id: 5,
                tag: <Select8 onSelect={(e)=>this.setMajor(e)}/>
              },
              {
                id: 6,
                tag: <Select6 onSelect={(e)=>this.setAmount(e)}/>
              },
              {
                id: 7,
                tag: <Select7 onSelect={(e)=>this.setApplicantCountry(e)}/>
              },
            ]
        }
       this.toggleSelected = this.toggleSelected.bind(this);
       this.loadMore = this.loadMore.bind(this)
    }
    renderSteps = ()=>{
      const {currentIndex, anim} = this.state;
      if (this.state.currentIndex == 6){
        //this.setState({currentIndex: 0})
        this.setState({showSearchBtn: true})
      }else{
      setTimeout(()=>{
        this.setState({currentIndex: this.state.currentIndex + 1},()=>{
          if (this.state.currentIndex == 6){
            //this.setState({currentIndex: 0})
            this.setState({showSearchBtn: true})
          }
        })
     
      }, 300)
    }
    }
    resetForm = () =>{
      const {currentIndex, anim} = this.state;
        this.setState({currentIndex: 0, showSearchBtn: false, offset: 0, activePage: 1, results: []})
    }
    setCountry = (e)=>{
      this.setState({country: e.value})
    }
    setApplicantCountry = (e)=>{
      this.setState({applicantCountry: e.value},()=>{
        if (this.state.currentIndex == 6){
          //this.setState({currentIndex: 0})
          this.setState({showSearchBtn: true})
        }
      })
    }
    setGpa = (e)=>{
      this.setState({gpa: e.value})
    }
    setMajor = (e)=>{
      this.setState({major: e.value})
    }
    setStates = (e)=>{
      this.setState({state: e.value},()=>{
      })
    }
    setLevel = (e)=>{
      this.setState({level: e.value})
    }
    setAmount = (e)=>{
      this.setState({amount: e.value},()=>{
       
      })
    }
    setCriteria = (e)=>{
      this.setState({criteria: e.value})
    }
    
    toggleSelected = id => {
      console.log(id)
      let oldSelected = this.state.selected
      if(oldSelected[id]){
        oldSelected[id] = !oldSelected[id]
      }else{
        oldSelected[id] = true
      }
      
      this.setState({
        selected:oldSelected
      })
    }
    loadMore(e){
      this.setState({offset: this.state.offset + 15, activePage: this.state.activePage + 15},()=>{
        //use a promise here
      const {applicantCountry, resultCount, amount, gpa, criteria, level, country, isloading, results, error, major} = this.state;
      console.log(JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount}))
        const {offset} = this.state;
        fetch(`/api/scholarship?offset=${offset}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount})
      })
      .then(            
          response => response.json()                        
      )
      .then(
          data => {
              if(data.length != 0){
              this.setState({isloading: false, results: [...this.state.results, ...data.rows], resultCount: data.count}, ()=>{
                  
              })
          }
             
      }
      )
      })
    }

    handleChildClick = () => {
      // You can access the prop you pass to the children
      // if you want to do some magic stuff
      this.setState({showConfirm: false})
   }
   confirmSearchMain = () => {
    // You can access the prop you pass to the children
    // if you want to do some magic stuff
    
    this.setState({confirm: true, end: true},()=>{
      console.log("started")
      if(this.props.user.coin >= 0.5){
      //use a promise here
      const {applicantCountry, resultCount, amount, gpa, criteria, level, country, isloading, results, error, major} = this.state;
      console.log(JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount}))
        const {offset} = this.state;
        
      if(this.state.confirm){
        fetch(`/api/scholarship?offset=${offset}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount})
      })
      .then(            
          response => response.json()                        
      )
      .then(
          data => {
              if(data.length != 0){
              this.setState({isloading: false, end: true, results: data.rows, resultCount: data.count, confirm: false, showConfirm: false}, ()=>{
                if(this.state.resultCount > 10){
                  this.setState({end: false})
                  this.props.getUser(this.props.auth.user.user_id, this.props.auth.user.token);
                }
              })
          }
             
      }
      )
      }
    }
    else{
      //alert("No coin")
      //implement fetch no coin data here
      const {applicantCountry, resultCount, amount, offset, gpa, criteria, level, country, isloading, results, error, major} = this.state;
      console.log(JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount}))
      fetch(`/api/scholarship/no-coin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount})
    })
    .then(            
        response => response.json()                        
    )
    .then(
        data => {
            if(data.length != 0){
            this.setState({isloading: false, end: true, results: data, confirm: false, showConfirm: false, noCoin: true}, ()=>{
              
               
                this.props.getUser(this.props.auth.user.user_id, this.props.auth.user.token);
              
            })
        }
           
    }
    )
    }
    })
 }
    confirmSearch = () => {
    // You can access the prop you pass to the children
    // if you want to do some magic stuff
    this.setState({confirm: true, end: true},()=>{
      //use a promise here
      if(this.props.user.coin >= 0.5){
      const {applicantCountry, resultCount, amount, gpa, criteria, level, country, isloading, results, error, major} = this.props;
        const {offset} = this.state;
        
      if(this.state.confirm){
        JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount})
        fetch(`/api/scholarship?offset=0`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount})
      })
      .then(            
          response => response.json()                        
      )
      .then(
          data => {
              if(data.message == "Not enough coins"){
                this.setState({isloading: false, results: [], resultCount: 0, confirm: false, showConfirm: false},()=>{
                  //no coin method here
                })
              }
              else if(data.length != 0){
              this.setState({isloading: false, results: data.rows, resultCount: data.count, confirm: false, showConfirm: false}, ()=>{
                if(this.state.resultCount > 10){
                  this.setState({end: false})
                  this.props.getUser(this.props.auth.user.user_id, this.props.auth.user.token);
                }
              })
            
          }
          else{this.setState({isloading: false, results: [], resultCount: 0, confirm: false, showConfirm: false})}
             
      }
    
      )
    }else{
      alert('no coin')
    }
      }
    })
 }
    componentDidMount = async() =>{
      const { user = {} } = this.props.auth || {};
      if(user.type == "authenticated"){
      //console.log(this.props.auth)
      if(this.props.auth.user.type == "authenticated"){
      await this.props.getUser(this.props.auth.user.user_id, this.props.auth.user.token);
      //console.log(this.props.auth)
        const {applicantCountry, resultCount, amount, gpa, criteria, level, country, isloading, results, error, major} = this.props;
        const {offset} = this.state;
        if(this.props.search_state){
            if(this.props.country){
                this.setState({country: this.props.country},()=>{
                
                })
            }
            if(this.props.amount){
                this.setState({amount: this.props.amount},()=>{
                
                })
            }
            if(this.props.gpa){
                this.setState({gpa: this.props.gpa},()=>{
                
                })
            }
            if(this.props.criteria){
                this.setState({criteria: this.props.criteria},()=>{
                
                })
            }
            if(this.props.major){
                this.setState({major: this.props.major},()=>{
                
                })
            }
            if(this.props.applicantCountry){
                this.setState({applicantCountry: this.props.applicantCountry},()=>{
                
                })
            }
            if(this.props.level){
                this.setState({level: this.props.level},()=>{
                
                })
            }
            this.setState({showConfirm: true},()=>{
              
            })
            //console.log(JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount}))
            
          }
          }
        }
        else{
          Router.push('/login')
        }
    }
    search(){
        const {applicantCountry, major, country, gpa, criteria, level, amount, offset} = this.state;
        fetch(`/api/scholarship?offset=${offset}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({applicantCountry, major, country, gpa, criteria, level, amount})
        })
        .then(            
            response => response.json()                        
        )
        .then(
            data => {
                if(data.length != 0){
                this.setState({isloading: false, results: data.rows, resultCount: data.count}, ()=>{
                    
                })
    
                console.log(data)
            }
               
        }
        )
        .catch(e => console.log(e)
        )
    }
    render(){

    const { user = {} } = this.props.auth || {};
    const loggedIn = (Object.keys(user).length > 0 )
    const noCoin = this.state.results;
    const noCoinUnblur = noCoin[0];
    let countries = COUNTRIES;
    //let resultBlock;
    const {resultCount, results} = this.state;
        let resultBlock = (
          <React.Fragment>
          {results.length > 0?
          <React.Fragment>
          {results.map((result, id)=>
            <div style={{width: "65%!important"}}>
                <div key={id} className={`search-result long-rounded ${this.state.selected[id]?'active':''}`}>

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">{result.name}</h5>

                  <div className="short-info">
                    <div>Amount: {result.amount? <React.Fragment>{result.amount}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Criteria: {result.criteria? <React.Fragment>{result.criteria}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                  </div>

                  <div className="full-info">
                    <div>Amount: {result.amount? <React.Fragment>{result.amount}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Criteria: {result.criteria? <React.Fragment>{result.criteria}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Major: {result.major? <React.Fragment>{result.major}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Level: {result.level? <React.Fragment>{result.level}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>GPA: {result.gpa? <React.Fragment>{result.gpa}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Applicant Country: {result.applicantCountry? <React.Fragment>{result.applicantCountry}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Country: {result.country? <React.Fragment>{result.country}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Deadline: {result.deadline? <React.Fragment>{result.deadline}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div className='institution'>Institution: {result.institution? <React.Fragment>{result.institution}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div className='comment'>Comment: {result.comment? <React.Fragment>{result.comment}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div className='description'>Description: {result.description? <React.Fragment>{result.description}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                  </div>
                </div>
            </div>

            <div className="columns is-mobile">

                <div className="column is-5">
        <a className={
          this.state.selected[id]?
          'less'
          :
          'more'
        } onClick={() => { this.toggleSelected(id)}}>{this.state.selected[id]? <React.Fragment>Hide details</React.Fragment>: <React.Fragment>View Details</React.Fragment>}</a>
                </div>

                <div className="column is-7 has-text-right">
                  <div className="visit-school">
                    <a className="share">
                      <span className="icon">
                      <i class="fas fa-share-alt"></i>
                      </span>
                    </a>
                    <a className="star">
                      <span className="icon">
                      <i class="far fa-star"></i>
                      </span>
                    </a>
                    <a target="_blank" href={
                      `${result.url}`
                    }className="button yellowBtn nextBtn">Apply</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
          )}
        </React.Fragment>
        :
        <React.Fragment>
          <div className="search-result long-rounded">

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">No Result Found!</h5>

                  
                </div>
            </div>

            <div className="columns is-mobile">

                

                <div className="column is-7 has-text-right">
                  
                </div>
            </div>
          </div>
            </React.Fragment>
          }
          </React.Fragment>
        )
        let unBlurBlock = (
          <React.Fragment>
          {results.length > 0?
          <div style={{width: "65%!important"}}>
                <div className='search-result long-rounded'>

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">{noCoinUnblur.name}</h5>

                  <div className="short-info">
                    <div>Amount: {noCoinUnblur.amount? <React.Fragment>{noCoinUnblur.amount}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Criteria: {noCoinUnblur.criteria? <React.Fragment>{noCoinUnblur.criteria}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                  </div>

                </div>
            </div>

            <div className="columns is-mobile">

                <div className="column is-5">
       </div>

                <div className="column is-7 has-text-right">
                  <div className="visit-school">
                    
                    <a target="_blank" href="/buy-coin" className="button yellowBtn nextBtn unblur"> <span className="icon is-small">
                              <i style={{color: "#FFFFFF"}}className="fas fa-coins" aria-hidden="true"></i>
                            </span>&nbsp;&nbsp;&nbsp;Buy Coin</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
        :null}
        </React.Fragment>
        )
        let noCoinBlock = (
          <React.Fragment>
          {results.length > 0?
          <React.Fragment>
          {unBlurBlock}
          {results.map((result, id)=>
            <div style={{width: "65%!important"}}>
                <div key={id} className={`search-result long-rounded ${this.state.selected[id]?'active':''}`}>

            <div className="columns blur">

                <div className="column is-8">
                  <h5 className="result-name">{result.name}</h5>

                  <div className="short-info">
                    <div>Amount: {result.amount? <React.Fragment>{result.amount}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Criteria: {result.criteria? <React.Fragment>{result.criteria}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                  </div>

                </div>
            </div>

            <div className="columns is-mobile">

                <div className="column is-5">
       </div>

                <div className="column is-7 has-text-right">
                  <div className="visit-school">
                    
                    <a target="_blank" href="/buy-coin" className="button yellowBtn nextBtn unblur"> <span className="icon is-small">
                              <i style={{color: "#FFFFFF"}}className="fas fa-coins" aria-hidden="true"></i>
                            </span>&nbsp;&nbsp;&nbsp;Buy Coin</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
          )}
        </React.Fragment>
       :
       <React.Fragment>
          <div className="search-result long-rounded">

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">No Result Found!</h5>

                  
                </div>
            </div>

            <div className="columns is-mobile">

                

                <div className="column is-7 has-text-right">
                  
                </div>
            </div>
          </div>
            </React.Fragment>
          }
       </React.Fragment>
        )
    
    return(
        <Layout title="Scholarship Search" {...this.props}>
        <section style={{width: "100%!important"}} className="section search-block scholarship-search">
        <div className="container">

          <div className="columns is-centered">


            <div className="column">

                  <h1 className="title">Tell us more about your scholarship requirement</h1>
                  
                  <div className="columns">
                  <div className="force-center">
                  <div className="long-rounded yellow scholarshipHere">
                                    <div className="columns is-mobile align-center-now">
                                      <div className="column is-narrow is-hidden-mobile">
                                          <p>Scholarship Search</p>
                                      </div>
                                      <div className="column">
                                      {this.state.anim[this.state.currentIndex].tag}
                                      </div>
                                    </div>
                                </div>
                        

                        <div className="column is-narrow is-vcentered is-desktop-center">
                          <div className="content has-text-centered">
                          {!this.state.showSearchBtn?
                            <a onClick={this.renderSteps} className="button yellowBtn nextBtn">Next</a>
                            :
                            <React.Fragment>
                            <a onClick={()=>
                              this.setState({showConfirm: true},()=>{
                                
                              })
                              } className="button yellowBtn nextBtn right-margin-extra">Search</a>
                            <a onClick={this.resetForm} className="button yellowBtn nextBtn">Reset</a>
                            </React.Fragment>
                            }
                          </div>
                        </div>
                  </div>
                  </div>
            </div>


          </div>
        </div>
    </section>


    <section className="section search-results-block scholarship-search">
        <div className="container content set-width">

          <div className="columns is-mobile">

                <div className="column is-narrow is-left">
                  <h3>Results</h3>
                </div>

                <div className="column has-text-centered">
                  <div><span className="total-found">{this.state.resultCount? <React.Fragment>{this.state.resultCount}</React.Fragment>: <React.Fragment>0</React.Fragment>} Scholarships Found</span></div>

                </div>

                <div className="column is-narrow is-right">

                      <div className="dropdown is-hoverable">
                        <div className="dropdown-trigger">
                          <a href="/buy-coin"><button className="button grey is-rounded" aria-haspopup="true" aria-controls="dropdown-menu4">
                          <span className="icon is-small">
                              <i style={{color: "#F6BD27"}}className="fas fa-coins" aria-hidden="true"></i>
                            </span>
                          <span>{this.props.user? <React.Fragment>{this.props.user.coin}</React.Fragment>:  <React.Fragment>0</React.Fragment>} {this.props.user && this.props.user.coin != 1? <React.Fragment>coins</React.Fragment>:  <React.Fragment>coin</React.Fragment>} left</span>
                            
                          </button></a>
                        </div>
                        
                      </div>

                </div>
          </div>
          {this.props.user?
          <React.Fragment>
          {this.state.noCoin?
          <React.Fragment>
            {noCoinBlock}
          
            </React.Fragment>
            :
            <React.Fragment>
            {resultBlock}
            </React.Fragment>
          }
          </React.Fragment>
          :null}
          
          <Modal showResult={this.props.search_state? this.confirmSearch: this.confirmSearchMain} onClick={this.handleChildClick} activate={this.state.showConfirm} content="You will be charged 0.5 coin for this search" />
          
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-7-tablet is-5-desktop is-3-fullwidth is-12-mobile">

            {this.state.results.length >= 15 && this.state.results.length%15 == 0?
           
              <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                
                <ul className="pagination-list">
                
                  <li><a onClick={()=>this.loadMore(this.state.activePage)
                              }className="pagination-link is-current" aria-label="Goto page 1">Load More</a></li>
              
                </ul>
              </nav>
              :
              null
            }

          </div>
        </div>  
    </section>
    </Layout>
)
}
 }

 Scholarship.getInitialProps = async ({req,query}) => {
    let country, gpa, applicantCountry, level, criteria, major, amount, search_state;
    if(query.search){
        search_state = query.search;
    }
    if(query.country){
      country = query.country;
    }
    if(query.gpa){
      gpa = query.gpa;
    }
    if(query.applicantCountry){
      applicantCountry = query.applicantCountry;
    }
    if(query.level){
      level = query.level;
    }
    if(query.criteria){
        criteria = query.criteria;
      }
    if(query.major){
        major = query.major;
      }
    if(query.amount){
        amount = query.amount;
      }

    const auth =  await authInitialProps()({req}).auth;
    if(!auth){
      Router.push({
        pathname: '/login',
        query: {
          gpa: `${query.gpa}`,
          major: `${query.major}`,
          country: `${query.country}`,
          applicantCountry: `${query.applicantCountry}`
        }
      })
      //Router.push(`/login?redirect_from=scholarship-search&gpa=${query.gpa}&country=${query.country}&applicantCountry=${query.applicantCountry}&major=${query.major}&level=${query.level}&criteria=${query.criteria}&amount=${query.amount}`)
                        
    }
    return {auth,country, gpa, applicantCountry, level, criteria, major, amount, search_state}
    
  }

  function mapper(state) {
    return {
        user: state.user.data
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      clearError: () =>
    {
      dispatch(
        clearErrorCall()
      )
    },
    getUser: (userId, token) => {
        dispatch(
          getUserCall(userId, token)
        );
      },
    getReferrals: (url, userId, token) => {
        dispatch(
          getReferralsCall(url, userId, token)
        );
      },
    }
  };
  export default connect(mapper, mapDispatchToProps)(Scholarship);