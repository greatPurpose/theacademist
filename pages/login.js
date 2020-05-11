import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import '../main.css'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import Router from 'next/router'
class LoginNew extends React.Component{
    failureLog = (response) => {
        console.log(response)
        console.log('An error occured, please try again')
      }
      responseFacebook = async(response) =>{
          //console.log(response)
        let email = response.email;
        let firstName = response.first_name;
        let lastName = response.last_name;
        let token = response.accessToken;
        let userId = response.userID;
        let image = response.picture.data.url;
        await fetch('/api/facebook-login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email, token, userId, image})
        })
            .then(response=>response.json())
            .then(json=>{
                //console.log(json)
                //push here
                const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";
               
                    window[WINDOW_USER_SCRIPT_VARIABLE] = json || {};
                    
                 
                    if(this.props.redirect_from == "scholarship-search"){
                        Router.push( `/scholarship?search=true&gpa=${this.props.gpa}&country=${this.props.country}&applicantCountry=${this.props.applicantCountry}&major=${this.props.major}&level=${this.props.level}&criteria=${this.props.criteria}&amount=${this.props.amount}`)
                    }
                    else{
                    Router.push('/')
                    }
                
            })
        
            .catch(error=>console.log(error));
        
      }
      responseGoogle(response){
        let userObj = response.profileObj;
        //console.log(userObj);
        //post to google register api
        let email = userObj.email;
        let firstName = userObj.givenName;
        let lastName = userObj.familyName;
        let image = userObj.imageUrl;
        //dispatch(requestLogin());
        fetch('/api/google-login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({email, image})
        })
            .then(response=>response.json())
            .then(json=>{
                //console.log(json)
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
                //dispatch then push here
            })
            .catch(error=>console.log(error));
    
      }
    render(){
    return(
        <Layout title="Sign In" {...this.props}>
        <section className="section login">
        <div className="container">

            <div className="columns is-centered is-mobile">

                  <div className="column is-8-tablet is-6-desktop is-4-fullhd is-11-mobile">
                    <div className="content">
                      <div className="long-rounded grey" >

                        <h1 className="title">Sign in</h1>

                        <p style={{marginBottom: "20px"}}>Our biggest aim is to help <br/>
                            the international students with scholarships</p>

                        <div className="login-buttons has-text-centered">
                          <a href={
                              this.props.redirect_from == "scholarship-search"?
                              `/log-with-email?redirect_from=scholarship-search&gpa=${this.props.gpa}&country=${this.props.country}&applicantCountry=${this.props.applicantCountry}&major=${this.props.major}&level=${this.props.level}&criteria=${this.props.criteria}&amount=${this.props.amount}`
                                :
                                '/login-with-email'
                            } className="button yellowBtn">Continue with Email</a>
                          <FacebookLogin
                            appId="198600234003675"
                            autoLoad={false}
                            textButton="Facebook"
                            fields="first_name, last_name ,email, picture"
                            render={renderProps=>(
                                <a onClick={renderProps.onClick} className="button fb">Continue with Facebook</a>
                            )}
                            //icon={<TiSocialFacebookCircular size={30}/>}
                            //onClick={this.componentClicked}
                            onFailure={this.failureLog}
                            callback={this.responseFacebook} />
                            <GoogleLogin 
                            clientId="638073687773-flr8fq4sifc9eue2bs4001dr23rjjtb4.apps.googleusercontent.com"
                            buttonText="Google"
                            autoLoad={false}
                            render={renderProps=>(
                                <a onClick={renderProps.onClick} className="button google">Continue with Google</a>
                                
                            )}
                            onSuccess={this.responseGoogle}
                            onFailure={this.failureLog}
                        />
                          
                        </div>

                        <p><a href="/register">Don't have an account? Sign up!</a></p> 

                        <div className="columns is-centered is-vcentered referral is-mobile">
                          <div className="column is-narrow">
                            <img src="/static/images/referral.png"/>                            
                          </div>

                          <div className="column">
                          <p>Refer 3 friends and win up to $5,000! </p>
                            <a href="/referral-terms">Learn more</a>
                          </div>

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

LoginNew.getInitialProps = async ({req,query}) => {
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
export default LoginNew;