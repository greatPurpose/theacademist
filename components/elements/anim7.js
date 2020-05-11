import '../../main.css'
import { fadeOutDown } from 'react-animations'
import COUNTRIES from '../../helpers/gpa-countries';
import SCHOLARSHIP_COUNTRIES from '../../helpers/scholarship-countries'
import Select, { components } from 'react-select';
import { StyleSheet, css, minify } from 'aphrodite';
import _ from 'lodash'
import {getMajorsCall} from '../../calls/misc'
import {connect} from 'react-redux'
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

class Anim7 extends React.Component{
    componentDidMount = async()=> {
        await this.props.getMajors('https://www.theacademist.com/services/get-majors')
    }
    render(){
    return(
        <span className={css(
            this.props.data.done?
            (styles.fadeOutDown, props.data.class)
            :
            null
            )}>
        {this.props.major?
        <Select
                                       className="country-home"
                                       classNamePrefix="home-major-select"
                                       placeholder={
                                         this.props.prevData.done?
                                           "What is the scholarship major?"
                                           :null
                                       }
                                       isClearable={true}
                                      isSearchable={true}
                                      placeholder="Select Major"
                                      onChange={(e)=> this.props.onSelect(e)}
                                      name="applicant_countries"
                                      options={this.props.major}
                                    />
                                    :
        <Select
                                      className="country-home"
                                      classNamePrefix="home-major-select"
                                      placeholder={
                                        this.props.prevData.done?
                                          "What is the scholarship major?"
                                          :null
                                      }
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={(e)=>this.props.onSelect(e)}
                                      name="countries"
                              />
                                    }</span>
    )
   }         
}

function mapper(state) {
    return {
        major: state.major.data
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
    getMajors: (url) => {
        dispatch(
            getMajorsCall(url)
        );
      },
    }
  };
  export default connect(mapper, mapDispatchToProps)(Anim7);