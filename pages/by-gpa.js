import Layout from "../components/Layout";
import Select1 from "../components/select1";
import Select2 from "../components/select2";
import Select3 from "../components/select3";
import { authInitialProps, getClientSideToken, getServerSideToken } from "../lib/auth";
import '../animate.css'
import '../main.css'
import { bounceOut, bounceIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import Select, { components } from 'react-select';
import _ from 'lodash';

const styles = StyleSheet.create({
  bounce: {
    animationName: bounceOut,
    animationDuration: '4s'
  }
})
const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const STATES = [
	{ label: 'All', value: 'All' },
    { label: 'AK', value: 'AK' }
];
const GPAS = [
    { label: '2.0', value: '2.0' },
    { label: '2.1', value: '2.1' },
    { label: '2.2', value: '2.2' },
    { label: '2.3', value: '2.3' },
    { label: '2.4', value: '2.4' },
    { label: '2.5', value: '2.5' },
    { label: '2.6', value: '2.6' },
    { label: '2.7', value: '2.7' },
    { label: '2.8', value: '2.8' },
    { label: '2.9', value: '2.9' },
    { label: '3.0', value: '3.0' },
    { label: '3.1', value: '3.1' },
    { label: '3.2', value: '3.2' },
    { label: '3.3', value: '3.3' },
    { label: '3.4', value: '3.4' },
    { label: '3.5', value: '3.5' },
    { label: '3.6', value: '3.6' },
    { label: '3.7', value: '3.7' },
    { label: '3.8', value: '3.8' },
    { label: '3.9', value: '3.9' },
    { label: '4.0', value: '4.0' }
];

export default class ByGpa extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            results: [],
            resultCount: 0,
            isloading: false,
            level: 'Graduate',
            state: 'All',
            gpa: '3.8',
            offset: 0,
            selected: {},
            currentIndex: 0,
            showSearchBtn: false,
            anim: [
              {
                id: 1,
                tag: <Select1 onSelect={(e)=>this.setGpa(e)}/>
              },
              {
                id: 2,
                tag: <Select2 onSelect={(e)=>this.setLevel(e)}/>
              },
              {
                id: 3,
                tag: <Select3 onSelect={(e)=>this.setStates(e)}/>
              },
            ]
        }


        this.toggleSelected =  this.toggleSelected.bind(this)
    }
    
    setGpa = (e)=>{
      this.setState({gpa: e.value})
    }
    setStates = (e)=>{
      this.setState({state: e.value},()=>{
        if (this.state.currentIndex == 2){
          //this.setState({currentIndex: 0})
          this.setState({showSearchBtn: true})
        }
      })
    }
    setLevel = (e)=>{
      this.setState({level: e.value})
    }
    searchNow = () =>{
      const {gpa, state, level, isloading, results, offset} = this.state
        fetch(`/api/gpa`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({gpa, state, level, offset})
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

    componentDidMount = async() =>{
      //console.log("MOunted")
      //this.searchNow()
      
    }
    resetForm = () =>{
      const {currentIndex, anim} = this.state;
        this.setState({currentIndex: 0, showSearchBtn: false})
    }
    renderSteps = ()=>{
      const {currentIndex, anim} = this.state;
      if (this.state.currentIndex == 2){
        //this.setState({currentIndex: 0})
        this.setState({showSearchBtn: true})
      }else{
      setTimeout(()=>{
       /*let filtered = anim.findIndex(x => x.id == currentIndex + 1);
       if(currentIndex == 0){
       anim[filtered] = {
       id: currentIndex + 1,
       class: "",
       done: false,
       tag: <Select
       className="input-gpa bouceOut"
       classNamePrefix="gpa-select"
       placeholder="GPA"
       isClearable={true}
       isSearchable={true}
       onChange={(e)=>console.log(e.id)}
       name="countries"
       options={GPAS}
     />}
       }
       else if(currentIndex == 1){
        anim[filtered] = {
          id: currentIndex + 1,
          class: "",
          done: false,
          tag: <Select
          className="input-gpa bouceOut"
          classNamePrefix="gpa-select"
          placeholder="Level"
          isClearable={true}
          isSearchable={true}
          onChange={(e)=>console.log(e.id)}
          name="countries"
          options={GPAS}
        />
       }
      }
       else{
        anim[filtered] = {
          id: currentIndex + 1,
          class: "",
          done: false,
          tag: <Select
          className="input-gpa bouceOut"
          classNamePrefix="gpa-select"
          placeholder="State"
          isClearable={true}
          isSearchable={true}
          onChange={(e)=>console.log(e.id)}
          name="countries"
          options={GPAS}
        />
      }
       }*/
       //let newFilter = [...anim, ...updates]
       //console.log([...anim, anim[filtered]])
       //this.setState({anim: [...anim, anim[filtered]]},()=>{
        //setTimeout(()=>{
        this.setState({currentIndex: this.state.currentIndex + 1},()=>{
          
        })
      //}, 1000)
       //})
       
      
      }, 300)
    }
    }
    render(){
      const {results, resultCount} = this.state;
      const { user = {} } = this.props.auth || {};
      const loggedIn = (Object.keys(user).length > 0 )
        return(
        <Layout title="School Search By GPA" {...this.props}>
        <section className="section search-block">
        <div className="container">

          <div className="columns is-centered">


            <div className="column">

                  <h1 className="title">Find your best school match</h1>

                  <div className="columns is-vcentered">
                  <div className="force-center">
                  <div className="long-rounded yellow scholarshipHere">
                                    <div className="columns is-mobile align-center-now">
                                      <div className="column is-narrow">
                                          <p>GPA SEARCH</p>
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
                            <a onClick={this.searchNow} className="button yellowBtn nextBtn right-margin-extra">Search</a>
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


    <section className="section search-results-block">
        <div className="container content set-width">

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
          {results? 
          <React.Fragment>
          {results.length > 0?
          <React.Fragment>
          {results.map((result, id)=>
          <div key={id} className={`search-result long-rounded ${this.state.selected[id]?'active':''}`}>

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">{result.name? <React.Fragment>{result.name}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</h5>

                  <div className="short-info">
          <div>GPA: {result.gpa? <React.Fragment>{result.gpa.toFixed(2)}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Level: {result.level? <React.Fragment>{result.level}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                  </div>

                  <div className="full-info">
                    <div>GPA: {result.gpa? <React.Fragment>{result.gpa.toFixed(2)}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>Level: {result.level? <React.Fragment>{result.level}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    {result.level == "Undergraduate"?
                    <React.Fragment>
                    <div>SAT: {result.sat? <React.Fragment>{result.sat}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>ACT: {result.act? <React.Fragment>{result.act}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                    <div>GMAT: {result.gmat? <React.Fragment>{result.gmat}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>GRE: {result.gre? <React.Fragment>{result.gre}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    </React.Fragment>
                    }
                    <div>TOEFL: {result.toefl? <React.Fragment>{result.toefl}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>IELTS: {result.ielts? <React.Fragment>{result.ielts}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>CITY: {result.city? <React.Fragment>{result.city}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
                    <div>STATE: {result.state? <React.Fragment>{result.state}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</div>
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
                        <i className="fas fa-share-alt"></i>
                      </span>
                    </a>
                    <a className="button yellowBtn nextBtn">Visit school</a>
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
            :
            <React.Fragment>
          <div className="search-result long-rounded">

            <div className="columns">

                <div className="column is-8">
                  <h5 className="result-name">No Result! (Search to see Schools)</h5>

                  
                </div>
            </div>

            <div className="columns is-mobile">

                

                <div className="column is-7 has-text-right">
                  
                </div>
            </div>
          </div>
            </React.Fragment>
          }

         
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

ByGpa.getInitialProps = async ({req,query}) => {
  const auth =  await authInitialProps()({req}).auth;
  return {auth}
  
}