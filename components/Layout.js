import Link from "next/link";
import { logoutUser } from "../lib/auth";
import Nav from './nav'
import Footer from './footer'
import Head from 'next/head';

const Layout = ({ title, children, auth, activeLink }) => {
  
  const { user = {} } = auth || {};
  /*let active;
  if(auth.user.type){
    active = true;
  }
  else{
    active = false;
  }*/
  //console.log(user)


  const loggedIn = (Object.keys(user).length > 0 )

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
    <Nav auth={auth} pathname={activeLink} loggedIn={loggedIn} user={user}/>
      {children}
    <Footer />
    </React.Fragment>
  );
};

export default Layout;
