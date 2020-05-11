import Layout from "../components/Layout";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import Moment from 'react-moment';
import '../main.css'
class RegisterWithEmail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activate: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      refCode: '',
      firstNameError: false,
      lasttNameError: false,
      emailError: false,
      passwordError: false,
      passwordMatchError: false,
      error: null,
      registered: false
    }
  }
  componentDidMount(){
    if(this.props.referral){
      this.setState({refCode: this.props.referral})
    }
  }
  doRegister = () => {
    this.setState({firstNameError: false, lasttNameError: false, emailError: false, passwordError: false, passwordMatchError: false},()=>{
    const {firstName, lastName, email, password, confirmPassword, refCode} = this.state;
    
    if ( email == ""){
      this.setState({error: 'A valid email is required', emailError: true})
        console.log('A valid email is required')
    }
    else if ( firstName == ""){
      this.setState({error: 'First Name is required', firstNameError: true})
      console.log('First Name is required')
    }
    else if ( lastName == ""){
      this.setState({error: 'Last Name is required', lasttNameError: true})
      console.log('Last Name is required')
    }
    else if ( password == ""){
      this.setState({error: 'Password is required', passwordError: true})
      console.log('Password is required')
    }
    else{
    if ( password == confirmPassword){
        this.setState({fetching: true, error: undefined});
    return fetch('https://www.theacademist.com/api/v1/user/register?ref={referral}'.replace('{referral}', refCode), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({firstName, lastName, email, password})
    })
        .then(response=>response.json())
        .then(json=>{
            if (json.error)
                throw Error(json.error.message || 'Unknown fetch error');
            this.setState({registered: true});
        })
        .catch(error=>this.setState({error: error.message}));
    }
    else {
        this.setState({error: 'Passwords do not match', passwordMatchError: true});
    }
}
    })
}
  render(){
  
  const {firstName, lastName, email, password, confirmPassword, registered} = this.state
  if(!registered){
    return(
        <Layout title="Register In With Email" {...this.props}>
        <section className="section login">
        <div style={{minHeight: "70vh"}} className="container">

            <div className="columns is-centered is-mobile">

                  <div className="column is-8-tablet is-6-desktop is-4-fullhd is-11-mobile">
                    <div className="content">
                      <div className="long-rounded grey" >

                        <h1 className="title">Create an account</h1>

                        <p style={{marginBottom: "20px"}}>The Academist our biggest aim is to help <br/>
                            the international students</p>
                        {this.state.error?
                        <p className="force-text-center">{this.state.error}</p>  
                        : null
                      }
                        <div className="login-buttons has-text-centered">
                        <div className="names-group">
                        <input value={firstName} onChange={e=>this.setState({firstName: e.target.value})} className={this.state.firstNameError?
                        "login-first-names errorBorder":
                        "login-first-names"
                        }
                        type="text" placeholder="First Name" />
                        <input value={lastName} onChange={e=>this.setState({lastName: e.target.value})} className={this.state.lastNameError?
                          "login-last-names errorBorder":
                          "login-last-names"
                        } 
                        type="text" placeholder="Last name" />
                        </div>
                          <input value={email} onChange={e=>this.setState({email: e.target.value})} className={this.state.emailError?
                          "login-email errorBorder":
                          "login-email" 
                          }
                          type="text" placeholder="Email" />
                          <input value={password} onChange={e=>this.setState({password: e.target.value})} className={this.state.passwordError || this.state.passwordMatchError?
                            "login-password errorBorder":
                            "login-password" 
                          }
                          type="password" placeholder="Password" />
                          <input value={confirmPassword} onChange={e=>this.setState({confirmPassword: e.target.value})} className={this.state.passwordMatchError?
                            "login-password errorBorder" :
                            "login-password"
                          }
                          type="password" placeholder="Confirm Password" />
                        
                        </div>

                        <div className="login-buttons has-text-centered">
                          <a onClick={this.doRegister} className="button yellowBtn">Sign Up</a>
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
    else{
      return(
      <Layout title="Register In With Email" {...this.props}>
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

RegisterWithEmail.getInitialProps = async ({req,query}) => {
  let referral;
    const auth =  await authInitialProps()({req}).auth;
    //console.log(query.ref)
    if(query.ref){
      referral = query.ref;
    }
    
    return {auth, referral}
    
  }
export default RegisterWithEmail;