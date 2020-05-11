import Layout from "../components/Layout";
import Link from "next/link";
import { authInitialProps } from "../lib/auth";
//import '../font-awesome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import '../main.css'
import '../plyr.css'
import { fadeOutDown } from 'react-animations'
import COUNTRIES from '../helpers/gpa-countries';
import SCHOLARSHIP_COUNTRIES from '../helpers/scholarship-countries'
import {getBlogCall} from '../calls/blog'
import fetch from "isomorphic-unfetch";
import TextTruncate from 'react-text-truncate';
import Select, { components } from 'react-select';
import Slider from '../components/Slider'
import {getClientSideToken} from '../lib/auth';
import Plyr from 'react-plyr';
import {connect} from 'react-redux'
import { StyleSheet, css, minify } from 'aphrodite';
import _ from 'lodash'
import Anim1 from '../components/elements/anim1';
import Anim2 from '../components/elements/anim2';
import Anim3 from '../components/elements/anim3';
import Anim4 from '../components/elements/anim4';
import Anim5 from '../components/elements/anim5';
import Anim6 from '../components/elements/anim6';
import Anim7 from '../components/elements/anim7';
minify(false);
const styles = StyleSheet.create({
  none: {

  },
  fadeOutDown: {
    animationName: fadeOutDown,
    animationDuration: '3s'
  },
  disappear:{
    display: 'none'
  },
  firstWidth:{
    width: '80%',
    top: '60px',
    backgroundColor: '#ffffff'
  },
  secondWidth:{
    width: '70%!important',
    top: '45px!important',
    backgroundColor: '#E9ECED!important'
  },
  thirdWidth:{
    width: '60%!important',
    top: '35px!important',
    backgroundColor: '#D9DCDE!important'
  },
  fourthWidth:{
    width: '50%!important',
    top: '25px!important',
    backgroundColor: '#D9DCDE!important'
  },
  fifthWidth:{
    width: '40%!important',
    top: '15px!important',
    backgroundColor: '#D9DCDE!important'
  },
  sixthWidth:{
    width: '30%!important',
    top: '5px!important',
    backgroundColor: '#D9DCDE!important'
  }
})
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


 class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      slider:false,
      currentIndex: 0,
      country: '',
      applicantCountry: '',
      gpa: '',
      major: '',
      amount: '',
      criteria: '',
      level: '',
      buttonState: true,
      currentIndexSecond: 0,
      activate: false,
      showNextStep: false,
      animationSecond: [
        {
          id: 1,
          class: null,
          done: false
        },
        {
          id: 2,
          class: null,
          done: false
        }
      ],
      animation: [
        {
          id: 1,
          class: null,
          done: false
        },
        {
          id: 2,
          class: null,
          done: false
        },
        {
          id: 3,
          class: null,
          done: false
        },
        {
          id: 4,
          class: null,
          done: false
        },
        {
          id: 5,
          class: null,
          done: false
        },
        {
          id: 6,
          class: null,
          done: false
        },
        {
          id: 7,
          class: null,
          done: false
        },
      ]
    }
  }
  nextStep2 = () =>{
    const {currentIndexSecond, animationSecond} = this.state;
    if(currentIndexSecond == 0){
      //change className here
     let updated = [{
          id: 1,
          class: null,
          done: true
        }]
        const filtered = animationSecond.filter(stuff => stuff.id !== currentIndexSecond + 1)
        const update = [...updated, ...filtered]
        this.setState({animationSecond: update})
      //set time out to push display none
      setTimeout(()=>{
        //set state and display none className = disappear
        let updated = [{
          id: 1,
          class: styles.disappear,
          done: true
        },
        {
          id: 2,
          class: styles.firstWidth,
          done: false
        }]
      this.setState({animationSecond: updated},()=>{
        console.log(this.state.animationSecond)
      })
      }, 200)
    }else if(currentIndexSecond == 1){
      //change className here
     let updated = [{
    id: 2,
    class: null,
    done: true
  }]
    const filtered = animationSecond.filter(stuff => stuff.id !== currentIndexSecond + 1)
    const update = [...updated, ...filtered]
    this.setState({animationSecond: update})
  //set time out to push display none
  setTimeout(()=>{
    //set state and display none className = disappear
    let updated = [
      {
        id: 1,
        class: styles.disappear,
        done: true
      },
    {
      id: 2,
      class: styles.disappear,
      done: true
    }]
  this.setState({animationSecond: updated},()=>{
    console.log(this.state.animationSecond)
  })
  }, 200)
    }
    this.setState({currentIndexSecond: currentIndexSecond + 1})
  }


  ////////////////////////////////////////////////////////////////
  nextStep = () =>{
    const {currentIndex, animation} = this.state;
    if(currentIndex == 0){
      //change className here
     let updated = [{
          id: 1,
          class: null,
          done: true
        }]
        const filtered = animation.filter(stuff => stuff.id !== currentIndex + 1)
        const update = [...updated, ...filtered]
        this.setState({animation: update})
      //set time out to push display none
      setTimeout(()=>{
        //set state and display none className = disappear
        let updated = [{
          id: 1,
          class: styles.disappear,
          done: true
        },
        {
          id: 2,
          class: styles.firstWidth,
          done: false
        },
        {
          id: 3,
          class: styles.secondWidth,
          done: false
        },
        {
          id: 4,
          class: styles.thirdWidth,
          done: false
        },
        {
          id: 5,
          class: styles.fourthWidth,
          done: false
        },
        {
          id: 6,
          class: styles.fifthWidth,
          done: false
        },{
          id: 7,
          class: styles.sixthWidth,
          done: false
        }]
      this.setState({animation: updated},()=>{
        console.log(this.state.animation)
      })
      }, 200)
    }else if(currentIndex == 1){
      //change className here
     let updated = [{
    id: 2,
    class: null,
    done: true
  }]
    const filtered = animation.filter(stuff => stuff.id !== currentIndex + 1)
    const update = [...updated, ...filtered]
    this.setState({animation: update})
  //set time out to push display none
  setTimeout(()=>{
    //set state and display none className = disappear
    let updated = [
      {
        id: 1,
        class: styles.disappear,
        done: true
      },
    {
      id: 2,
      class: styles.disappear,
      done: true
    },
    {
      id: 3,
      class: styles.firstWidth,
      done: false
    },
    {
      id: 4,
      class: styles.secondWidth,
      done: false
    },
    {
      id: 5,
      class: styles.thirdWidth,
      done: false
    },
    {
      id: 6,
      class: styles.fourthWidth,
      done: false
    },
    {
      id: 7,
      class: styles.fifthWidth,
      done: false
    }]
  this.setState({animation: updated},()=>{
    console.log(this.state.animation)
  })
  }, 200)
    }else if(currentIndex == 2){
       //change className here
     let updated = [{
      id: 3,
      class: null,
      done: true
    }]
      const filtered = animation.filter(stuff => stuff.id !== currentIndex + 1)
      const update = [...updated, ...filtered]
      this.setState({animation: update})
    //set time out to push display none
    setTimeout(()=>{
      //set state and display none className = disappear
      let updated = [
        {
          id: 1,
          class: styles.disappear,
          done: true
        },
        {
          id: 2,
          class: styles.disappear,
          done: true
        },
      {
        id: 3,
        class: styles.disappear,
        done: true
      },
      {
        id: 4,
        class: styles.firstWidth,
        done: false
      },
      {
        id: 5,
        class: styles.secondWidth,
        done: false
      },
      {
        id: 6,
        class: styles.thirdWidth,
        done: false
      },
      {
        id: 7,
        class: styles.fourthWidth,
        done: false
      }]
    this.setState({animation: updated},()=>{
      console.log(this.state.animation)
    })
    }, 200)
    }else if(currentIndex == 3){
        //change className here
     let updated = [{
      id: 4,
      class: null,
      done: true
    }]
      const filtered = animation.filter(stuff => stuff.id !== currentIndex + 1)
      const update = [...updated, ...filtered]
      this.setState({animation: update})
    //set time out to push display none
    setTimeout(()=>{
      //set state and display none className = disappear
      let updated = [
        {
          id: 1,
          class: styles.disappear,
          done: true
        },
        {
          id: 2,
          class: styles.disappear,
          done: true
        },
      {
        id: 3,
        class: styles.disappear,
        done: true
      },
      {
        id: 4,
        class: styles.disappear,
        done: true
      },
      {
        id: 5,
        class: styles.firstWidth,
        done: false
      },
      {
        id: 6,
        class: styles.secondWidth,
        done: false
      },{
        id: 7,
        class: styles.thirdWidth,
        done: false
      }]
    this.setState({animation: updated},()=>{
      console.log(this.state.animation)
    })
    }, 200)
    }else if(currentIndex == 4){
        //change className here
     let updated = [{
      id: 5,
      class: null,
      done: true
    }]
      const filtered = animation.filter(stuff => stuff.id !== currentIndex + 1)
      const update = [...updated, ...filtered]
      this.setState({animation: update})
    //set time out to push display none
    setTimeout(()=>{
      //set state and display none className = disappear
      let updated = [
        {
          id: 1,
          class: styles.disappear,
          done: true
        },
        {
          id: 2,
          class: styles.disappear,
          done: true
        },
      {
        id: 3,
        class: styles.disappear,
        done: true
      },
      {
        id: 4,
        class: styles.disappear,
        done: true
      },
      {
        id: 5,
        class: styles.disappear,
        done: true
      },
      {
        id: 6,
        class: styles.firstWidth,
        done: false
      },
      {
        id: 7,
        class: styles.secondWidth,
        done: false
      }]
    this.setState({animation: updated},()=>{
      console.log(this.state.animation)
      
    })
    }, 200)
    }else if(currentIndex == 5){
        //change className here
     let updated = [{
      id: 6,
      class: null,
      done: true
    }]
      const filtered = animation.filter(stuff => stuff.id !== currentIndex + 1)
      const update = [...updated, ...filtered]
      this.setState({animation: update})
    //set time out to push display none
    setTimeout(()=>{
      //set state and display none className = disappear
      let updated = [
        {
          id: 1,
          class: styles.disappear,
          done: true
        },
        {
          id: 2,
          class: styles.disappear,
          done: true
        },
      {
        id: 3,
        class: styles.disappear,
        done: true
      },
      {
        id: 4,
        class: styles.disappear,
        done: true
      },
      {
        id: 5,
        class: styles.disappear,
        done: true
      },
      {
        id: 6,
        class: styles.disappear,
        done: true
      },
      {
        id: 7,
        class: styles.firstWidth,
        done: false
      }
    ]
    this.setState({animation: updated, buttonState: false},()=>{
      console.log(this.state.animation)
      this.setState({showNextStep: true})
    })
    }, 200)
    }
    this.setState({currentIndex: currentIndex + 1})
    
  }
  showModal = () => {
    this.setState({activate: true})
  }
  hideModal = () =>{
    this.setState({activate: false})
  }
  setCountry = (e)=>{
    this.setState({country: e.value})
  }
  setApplicantCountry = (e)=>{
    this.setState({applicantCountry: e.value},()=>{
      
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
  
  componentDidMount = async() =>{
    await this.props.getBlog('/api/blog')
    await this.setState({
      slider:true,
    })
  }
  render(){
    const {posts} = this.props
    let toggleClass;
    if(this.state.activate){
        toggleClass ="modal is-active"
    }
    else{
        toggleClass ="modal"
    }
  return (
    <Layout title="Home" activeLink="home" auth={this.props.auth}>
     <section className="hero home">
      <div className="hero-body">
        
        <img className="is-hidden-tablet" src="static/images/home-mobile-header-bg.PNG" style={{width: "100%"}} />
        

        <div className="container">

                <div className="columns">
                  <div className="column is-offset-1-desktop is-offset-2-widescreen is-7-tablet">
                    <div>

                        <h3 className="title is-3">
                            Find international student scholarship to the U.S and Canada here!
                        </h3>

                        <div>
                            <ul className="progressbar">
                              <li className="active"><span className="circle"></span></li>
                              <li className={
                                this.state.animation[0].done?
                                "active"
                                :
                                ""
                              }><span className="circle"></span></li>
                              <li className={
                                this.state.animation[1].done?
                                "active"
                                :
                                ""
                              }
                              ><span className="circle"></span></li>
                              <li className={
                                this.state.animation[2].done?
                                "active"
                                :
                                ""
                              }
                              ><span className="circle"></span></li>
                              <li className={
                                this.state.animation[3].done?
                                "active"
                                :
                                ""
                              }
                              ><span className="circle"></span></li>
                              <li className={
                                this.state.animation[4].done?
                                "active"
                                :
                                ""
                              }
                              ><span className="circle"></span></li>
                              <li className={
                                this.state.animation[5].done?
                                "active"
                                :
                                ""
                              }
                              ><span className="circle"></span></li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="columns">
                    
                    <div className="column is-offset-1-desktop is-offset-2-widescreen is-6-tablet is-6-desktop">

                        <div className="contain set-width-75">
                            <div className="card-stack">
                              <ul className="card-list">
                              {process.browser?
                              <React.Fragment>
                              {this.state.animation[6].done?
                                null:
                                <Anim7 onSelect={(e)=>this.setMajor(e)} data={this.state.animation[6]} prevData={this.state.animation[5]}/>
                              }
                              {this.state.animation[5].done?
                                null:
                                <Anim6 onSelect={(e)=>this.setAmount(e)} data={this.state.animation[5]} prevData={this.state.animation[4]}/>
                              }
                              {this.state.animation[4].done?
                                null:
                                <Anim5 onSelect={(e)=>this.setGpa(e)} data={this.state.animation[4]} prevData={this.state.animation[3]}/>
                              }
                              {this.state.animation[3].done?
                                null:
                                <Anim4 onSelect={(e)=>this.setLevel(e)} data={this.state.animation[3]} prevData={this.state.animation[2]}/>
                             }
                                {this.state.animation[2].done?
                                null:
                                <Anim3 onSelect={(e)=>this.setCriteria(e)} data={this.state.animation[2]} prevData={this.state.animation[1]}/>
                                 }
                                {this.state.animation[1].done?
                                null:
                                <Anim2 onSelect={(e)=>this.setApplicantCountry(e)} data={this.state.animation[1]} prevData={this.state.animation[0]}/> }
                                {this.state.animation[0].done?
                                null:
                                <Anim1 onSelect={(e)=>this.setCountry(e)} data={this.state.animation[0]}/> }
                                    </React.Fragment> 
                                :null}                    
                              </ul>
                              <div style={{cursor: "pointer"}} className="learn-more">
                                    <span onClick={this.showModal} className="icon has-text-info push-away">
                                    <FontAwesomeIcon className="far" icon={faPlayCircle} size="2x" color="#000000"/>
                                    </span>
                                    <span onClick={this.showModal}>Learn more</span>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div className="column with-button is-4-desktop is-4-tablet">
                    {this.state.showNextStep?
                      <a href={
                        !this.state.buttonState?
                        `/scholarship?search=true&gpa=${this.state.gpa}&country=${this.state.country}&applicantCountry=${this.state.applicantCountry}&major=${this.state.major}&level=${this.state.level}&criteria=${this.state.criteria}&amount=${this.state.amount}`
                        :""
                      }className="button yellowBtn nextBtn" >Show Results</a>
                      :
                      <a onClick={this.nextStep} className="button yellowBtn nextBtn" id="btn1">Next step</a> 
                    }
                    </div>
                
                </div>

        </div>
      </div>
    </section>


    <section className="section section-tabs">
        <div className="tabs is-toggle is-toggle-rounded is-centered is-hidden-mobile">
          <ul>

            <li>
              <a href="/scholarship"><span>Search Scholarship</span></a>
            </li>

            <li>
              <a href="/gpa-calculator"><span>GPA Calculator</span></a>
            </li>

            <li>
              <a href="/schools"><span>Search School</span></a>
            </li>

          </ul>
        </div>

        <div className="container">

          <div className="columns reverse-mobile">
              
              <div className="column">
                  <div className="columns tabs-content">
                  
                      <div className="column is-offset-1">

                          <div className="contain">
                              <div className="card-stack">
                                <ul className="card-list">
                                {this.state.animationSecond[1].done?
                                null:
                                <Select         
                                className={css(
                                  this.state.animationSecond[1].done?
                                  (styles.fadeOutDown, this.state.animationSecond[1].class)
                                  :
                                  null
                                  )}  
                                      classNamePrefix="home-applicant-country-select"
                                      placeholder="What is your applicant country?"
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={(e)=>console.log(e.id)}
                                      name="countries"
                                      components={{ Option: IconOption, SingleValue, SelectContainer }}
                                      options={SCHOLARSHIP_COUNTRIES}
                                      />}
                                  {this.state.animationSecond[0].done?
                                null:
                                  <Select
                                  className={css(
                                    this.state.animationSecond[0].done?
                                    (styles.fadeOutDown, this.state.animationSecond[0].class)
                                    :
                                    null
                                    )}  
                                      classNamePrefix="home-gpa-select"
                                      placeholder="What country did you obtain your degree?"
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={console.log('change')}
                                      name="countries"
                                      components={{ Option: IconOption, SingleValue, SelectContainer }}
                                      options={COUNTRIES}
                                  /> }                     
                                </ul>
                              </div>
                          </div>
                      </div>

                      <div className="column with-button is-2-desktop is-2-tablet">
                      
                      <a className="button yellowBtn nextBtn" onClick={this.nextStep2}>Next step</a>
                       
                      </div>
                  
                  </div>

              </div>
              
              <div className="column">
                  <div className="content">
                      <h3>GPA Calculator</h3>
                      <p>
                          Do you know your result equivalent in the US standard? 
                          If not, this tool helps students, high school or otherwise evaluate their results.
                      </p>

                      <ul className="custom-list">
                        <li>Choose your country & level of education</li>
                        <li>Input results for conversion into U.S. standard</li>
                        <li>Search school or scholarship</li>
                      </ul>
                  </div>
              </div>

          </div>
        </div>
    </section>


    <section className="section section-text-grid">
      <div className="container is-fluid">

            <div className="columns is-mobile is-multiline is-centered">
              <div className="column is-two-thirds-mobile">
                <div>
                  <p className="heading">$19B+</p>
                  <p className="title">Available Scholarships in North America</p>
                </div>
              </div>

              <div className="column is-half-mobile">
                <div>
                  <p className="heading">35</p>
                  <p className="title">Countries supported</p>
                </div>
              </div>

              <div className="column is-half-mobile">
                <div>
                  <p className="heading">5M+</p>
                  <p className="title">Students served</p>
                </div>
              </div>
            </div>
          
      </div>
    </section>


    <section className="section section-slider is-medium">
      <div className="container">

        <div className="content">
            <h3 className="topic-slider">Trending topics among students</h3>
        </div>
        
        <div style={{maxWidth: "100%!important"}} className="columns images is-mobile">
        {this.props.posts?
        <React.Fragment>
        {this.state.slider && <Slider posts={posts}/> } 
        </React.Fragment>
        :null}
        </div>
        
      </div>
    </section>


    <section className="section section-topics container is-hidden-mobile">

        <div className="columns is-vcentered is-centered">
            <div className="column">
                <div className="content">
                    <h5>How it works</h5>
                    <h3>Searching for scholarship</h3>

                    <ul className="custom-list">
                      <li>Ensure you know your GPA in the U.S. or Canada standard </li>
                      <li>Enter all the criteria fitting your search, such as aspired level of study, amount, major, desired country of scholarship etc</li>
                      <li>You have an option to save displayed result and make other searches</li>
                      <li>Remember don't forget to share with friends</li>
                    </ul>

                    <a href="/scholarship" className="button yellowBtn">Get started</a>
                </div>
            </div>

            <div className="column with-image">
                <div>
                    <img src="static/images/home_1.gif" />
                </div>
            </div>
        </div>


        <div className="columns is-vcentered is-centered">

            <div className="column with-image">
                <div>
                    <img src="static/images/home_2.gif" />
                </div>
            </div>

            <div className="column">
                <div className="content">
                    <h5>How it works</h5>
                    <h3>GPA Calculator</h3>

                    <ul className="custom-list">
                      <li>To use this tool, you need a copy of your high school  or college transcript</li>
                      <li>Choose the country and level attained</li>
                      <li>Input all your grades</li>
                      <li>Convert and use the converted GPA to search either scholarships or schools that fits your profile</li>
                    </ul>

                    <a href="/gpa-calculator" className="button yellowBtn">Get started</a>
                </div>
            </div>
        </div>

        <div className="columns is-vcentered is-centered">
            <div className="column">
                <div className="content">
                    <h5>How it works</h5>
                    <h3>Search School</h3>

                    <ul className="custom-list">
                      <li>You can search school either</li>
                      <li>By GPA, which helps you to know what school will accept it, simply enter your converted GPA and find</li>
                      Or <br/>
                      <li>By major, which helps you find a best fit school that offers your desired program, both at undergraduate and graduate level</li>
                    </ul>

                    <a href="/schools" className="button yellowBtn">Get started</a>
                </div>
            </div>

            <div className="column with-image">
                <div>
                    <img src="static/images/home_3.gif" />
                </div>
            </div>
        </div>          
    </section>


    <section className="section section-getstarted">
      <div className="container">

        <div className="content">
            <h3 className="title is-3">Get started in a few seconds</h3>
            <p className="centered-on-mobile">The Academist supports a variety of students in finding a scholarship</p>
        </div>

        <div className="columns">

            <div className="column">
              <img src="/static/images/bigicon1.PNG" />
              <span>Enter search criteria</span>
            </div>

            <div className="column is-hidden-mobile">
              <hr/>
            </div>

            <div className="column">
              <img src="/static/images/bigicon2.PNG" />
              <span>Find & filter scholarship results</span>
            </div>

            <div className="column is-hidden-mobile">
              <hr/>
            </div>

            <div className="column">
              <img src="/static/images/bigicon3.PNG" />
              <span>Apply</span>
            </div>
        </div>

      </div>
    </section>


    <section className="section section-appdownload is-hidden-mobile">
      <div className="container">

        <div className="content">
            <h3>From the poorest grade to the best, and from need to merit - 
                The Academist finds all the scholarships for everyone</h3>
            <p>Meet students around the world and participate in trending discussions in the chat forum, all in the app</p>
            <div>
              <a href=""><img src="static/images/appstore.png" /></a>
              <a href=""><img src="static/images/googleplay.png" /></a>
            </div>
        </div>

      </div>
    </section>
    <div className={toggleClass}>
        <div className="modal-background"></div>
        <div class="modal-content">
        <Plyr
                                type="video"
                                autoplay={false}
                                url="https://www.theacademist.com/img/The_Academist.mp4"
                                onEnd={this.hideModal}
                                />
  </div>
  <button onClick={this.hideModal}class="modal-close is-large" aria-label="close"></button>
        </div>
    </Layout>
  );
  }
}

Index.getInitialProps = async({req,res, query}) => {
  let posts;
  let auth;
  if(req){
    auth =  await authInitialProps()({req}).auth;
  }
  else{
    auth = await getClientSideToken()
  }
   
  return { auth };
  
}
function mapper(state) {
  return {
      posts: state.blog.data
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
  getBlog: (url) => {
      dispatch(
        getBlogCall(url)
      );
    },
  }
};

export default connect(mapper, mapDispatchToProps)(Index)
