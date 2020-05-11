import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import Router from 'next/router'
import '../main.css'
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activate: false,
      signedUp: false
    }
  }
  componentDidMount(){
    this.setState({activate: true})
  }
  onAgree = () =>{
    this.setState({activate: false})
  }
  failureLog = (response) => {
    console.log(response)
    console.log('An error occured, please try again')
  }
  responseFacebook = async(response) =>{
      console.log(response)
    let email = response.email;
    let firstName = response.first_name;
    let lastName = response.last_name;
    let token = response.accessToken;
    let userId = response.userID;
    await fetch('/api/facebook-register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({email, token, userId, firstName, lastName, image})
    })
        .then(response=>response.json())
        .then(json=>{
              //console.log(json)
              this.setState({signedUp: true},()=>{
                setTimeout(()=>{
                  Router.push('/login-new?ref-message-code=1')
                }, 3000)
              })
            //push here
        })
    
        .catch(error=>console.log(error));
    
  }
  responseGoogle = (response)=>{
    let userObj = response.profileObj;
    console.log(userObj);
    //post to google register api
    let email = userObj.email;
    let firstName = userObj.givenName;
    let lastName = userObj.familyName;
    let image = userObj.imageUrl;
    //dispatch(requestLogin());
    fetch('/api/google-register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({firstName, lastName, email, image})
    })
        .then(response=>response.json())
        .then(json=>{
            //console.log(json)
            if(json.message == "Success"){
            this.setState({signedUp: true})
            setTimeout(()=>{
              Router.push('/login-new?ref-message-code=1')
            }, 5000)
          }
        })
        .catch(error=>console.log(error));

  }
  render(){
  let toggleClass;
    if(this.state.activate){
        toggleClass ="modal is-active"
    }
    else{
        toggleClass ="modal"
    }
    if(!this.state.signedUp){
    return(
        <Layout title="Register" {...this.props}>
        <section className="section login">
        <div className="container">

            <div className="columns is-centered is-mobile">

                  <div className="column is-8-tablet is-6-desktop is-4-fullhd is-11-mobile">
                    <div className="content">
                      <div className="long-rounded grey" >

                        <h1 className="title">Sign Up</h1>

                        <p style={{marginBottom: "20px"}}>Our biggest aim is to help <br/>
                            the international students with scholarships</p>

                        <div className="login-buttons has-text-centered">
                          <a href="/register-with-email" className="button yellowBtn">Sign Up with Email</a>
                          <FacebookLogin
                            appId="198600234003675"
                            autoLoad={false}
                            textButton="Facebook"
                            fields="first_name, last_name ,email"
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

                        <p><a href="/login">Already have an account? Sign In!</a></p> 

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
        <div className={toggleClass}>
        <div className="modal-background"></div>
        <div style={{display: "flex!important", justifyContent: "center"}} className="modal-content">
            <div className="long-rounded grey set-width-box" >
        <p style={{textAlign: "center"}}>By continuing to use The Academist, 
          you agree with our <br/><a style={{color: "#F6BD27"}} href="/terms-of-use"><strong>legal policies</strong></a></p>
          <div className="login-buttons has-text-centered">
          <a onClick={this.onAgree} className="button yellowBtn">I Agree</a>
          </div>
        </div>
        </div>
        </div>
    </section>
        </Layout>
    );
   }else{
    return(
    <Layout title="Register" {...this.props}>
      <section className="section login">
      <div style={{minHeight: "70vh"}} className="container">

          <div className="columns is-centered is-mobile">

                <div className="column is-8-tablet is-6-desktop is-4-fullhd is-11-mobile">
                  <div className="content">
                    <div className="long-rounded grey" >

                      <h1 className="title">Create an account</h1>

                      <p style={{marginBottom: "20px"}}>The Academist our biggest aim is to help <br/>
                          the international students</p>
                      
                      <div className="login-buttons has-text-centered">
                      <div className="columns is-centered">
                              <div className="column is-11">
  
                                <div className="columns is-centered is-vcentered">
                                <div className="row coin_succeess">
              <div className="col-md-4">
              </div>
              <div className="col-md-4 col-sm-12">
                  <div className="col-spaced box">
                  <div className="align-success aligned">
              <svg id="createdAnimation" className="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
              <path id="createdAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
              <circle id="createdAnimationCircle" cx="35" cy="35" r="24" stroke="F6BD27" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
              <polyline id="createdAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent"/>
              </svg></div>
                      <p className="success_text">Registered Successfully!</p>
                      <p className="success_text">Verify your email to begin searching for scholarships</p>
                      <p className="success_text"><a href="/login-with-email">Sign In</a></p>
                      
                  </div>
              </div>
              <div className="col-md-4">
              </div>
              <br />
              <br />
              </div>
                                </div>
                              </div>
                            </div>
                      </div>


                    </div>

                  </div>
                </div>

          </div>
      </div>
      
      
  </section>
      </Layout>
    )
  }
  }
}

Register.getInitialProps = async ({req,query}) => {
    const auth =  await authInitialProps()({req}).auth;
    
    return {auth}
    
  }
export default Register;