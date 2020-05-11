import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import '../main.css'
import { loginUser } from "../lib/auth";
import Router from "next/router";
import {loginUserCall, facebookLoginUserCall, googleLoginUserCall, clearErrorCall, getUserCall} from '../calls/user';
import {connect} from 'react-redux';
class LoginWithEmail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
  }
  showError = err => {
    console.error(err);
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, isLoading: false });
  };
  handleSubmit = () => {
    const { email, password } = this.state;
    fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({email, password})
    })
        .then(response=>response.json())
        .then(json=>{
            if (json.error)
                this.setState({error: json.error})
            const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";
            if (typeof window !== "undefined") {
            console.log(json)
            window[WINDOW_USER_SCRIPT_VARIABLE] = json || {};
                    
            }
            if(this.props.redirect_from == "scholarship-search"){
              Router.push( `/scholarship?search=true&gpa=${this.props.gpa}&country=${this.props.country}&applicantCountry=${this.props.applicantCountry}&major=${this.props.major}&level=${this.props.level}&criteria=${this.props.criteria}&amount=${this.props.amount}`)
          }
          else{
          Router.push('/')
          }
        })
        .catch(error=>this.setState({error: error.message}));

  };
  render(){
    const { email, password, error, isLoading } = this.state;
    return(
        <Layout title="Sign In With Email" {...this.props}>
        <section className="section login">
        <div style={{minHeight: "70vh"}} className="container">

            <div className="columns is-centered is-mobile">

                  <div className="column is-8-tablet is-6-desktop is-4-fullhd is-11-mobile">
                    <div className="content">
                      <div className="long-rounded grey" >

                        <h1 className="title">Sign in</h1>

                        <p style={{marginBottom: "20px"}}>The Academist our biggest aim is to help <br/>
                            the international students</p>
                            {error && <p className="force-text-center">{error}</p>}
                        <div className="login-buttons has-text-centered">
                          <input value={email} onChange={e=>this.setState({email: e.target.value})} className="login-email" type="text" placeholder="Email" />
                          <input value={password} onChange={e=>this.setState({password: e.target.value})} className="login-password" type="password" placeholder="Password" />
                        </div>

                        <p className="is-pulled-right"><a hre="/forgot-password">Forgot Password</a></p> 

                        <div className="login-buttons has-text-centered">
                          <a onClick={this.handleSubmit} className="button yellowBtn">Login</a>
                        </div>


                      </div>

                    </div>
                  </div>

            </div>
        </div>
    </section>
        </Layout>
    );
  }
}

LoginWithEmail.getInitialProps = async ({req,query}) => {
  console.log(query)
  let country, gpa, applicantCountry, level, criteria, major, amount, redirect_from;
  if(query.redirect_from){
      redirect_from = query.redirect_from;
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
  
  return {auth,country, gpa, applicantCountry, level, criteria, major, amount, redirect_from}
 
    
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
      /*facebookLogin: (url, email, userId, accessToken, e) => {
        dispatch(
          facebookLoginUserCall(url, email, userId, accessToken, e)
        );
      },
      googleLogin: (url, email, e) => {
        dispatch(
          googleLoginUserCall(url, email, e)
        );
      }, */
        fetchData: (url, email, password, e) => 
        {
          if (url && email && password) {
            dispatch(
              loginUserCall(url, email, password, e)
            );
          }
        }
    };
  };
  
export default connect(null, mapDispatchToProps)(LoginWithEmail);