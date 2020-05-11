import Link from "next/link";
import { logoutUser } from "../lib/auth";

class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      mobileState: false
    }
  }
  mobileMenu = () =>{
    this.setState({mobileState: !this.state.mobileState})
  }
  render(){
    const {loggedIn, pathname, auth} = this.props;
    return(
        <header>

        <nav 
        className={ this.state.mobileState? 'navbar is-transparent menu-visible'
        :
        "navbar is-transparent"
        }
        role="navigation" aria-label="main navigation">

          <div className="navbar-brand">

            <a className="logo navbar-item space-between-8" href="/">
              <img className="is-hidden-mobile" src="/static/images/logo-desktop.jpg" />
              <img className="is-hidden-tablet" src="/static/images/logo-mobile.PNG" />
            </a>
        
            <a role="button" onClick={this.mobileMenu} className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>
        
          <div className="navbar-menu" id="navMenu">
            
            <div className="navbar-start">
                  {pathname == "home"?
                  <a href="/" className="navbar-item space-between-3 is-active">Home</a>
                  : <a href="/" className="navbar-item space-between-3">Home</a>
                  }
                  {pathname == "blog"? <a href="/blog" className="navbar-item space-between-3 is-active">Blog</a>
                    : <a href="/blog" className="navbar-item space-between-3">Blog</a>  
                  }
                  {pathname == "forum"?
                  <a href="/forum" className="navbar-item space-between-3 is-active">Forum</a>
                  : <a href="/forum" className="navbar-item space-between-3">Forum</a>
                  }
            </div>
            <div className="navbar-end">
            {!loggedIn?
                  <React.Fragment>
                  <a className="navbar-item no-account" href="/register">Sign up</a>
                  <a className="navbar-item no-account" href="/login">Login</a>
                  </React.Fragment>
                  :
                  <React.Fragment>
                  <div className="navbar-item account has-dropdown is-hoverable">
                      <a className="navbar-link is-arrowless button">
                        <span className="avatar"><img className="profile-pic-small" src={auth.user.image} /></span>
                        <span className="name">{auth.user.lastName}</span>
                      </a>

                      <div className="navbar-dropdown is-boxed">
                        <a href="/profile" className="navbar-item">My Profile</a>
                        <a href="/buy-coin" className="navbar-item">Buy Coin</a>
                        <a onClick={logoutUser} className="navbar-item">Log out</a>
                      </div>
                      
                  </div>   
                  </React.Fragment>
                  }              
            </div>
          
          </div>

          <div className="getstarted is-hidden-desktop">
          {!loggedIn?
                <a href="/register" className="button">Get started</a>
            :
            <a href="/scholarship" className="button">Get started</a>
          }
          </div>
          <div class="mobile-menu">
          {!loggedIn?
          <div class="mm-links">
          <a href="/" class="mm-link">Home</a>
          <a href="/login" class="mm-link">Login</a>
          <a href="/register" class="">Register</a>
        </div>
            :
            <div class="mm-links">
              <a href="/" class="mm-link">Home</a>
              <a href="/profile" class="mm-link">My Profile</a>
              <a onClick={logoutUser} class="">Log out</a>
            </div>
          }

            <h3 class="mm-title">Sections</h3>

            <div class="mm-links">
              <a href="/scholarship" class="mm-link">Search Scholarship</a>
              <a href="/gpa-calculator" class="mm-link">GPA Calculator</a>
              <a href="/schools" class="mm-link">Search School</a>
            </div>

            <div class="mm-links-block">
              <a href="/blog">Blog</a>
              <a href="/forum">Forum</a>
            </div>            

            <h3 class="mm-title">The Academist</h3>

            <div class="mm-info-links">
              <a class="mm-info-link">About Us</a>
              <a href="/buy-coin" class="mm-info-link">Buy Coin</a>
              <a href="/privacy-policy" class="mm-info-link">Legal</a>
            </div>
            

          </div>

        </nav>
    </header>

    )
        }
}

export default Nav;