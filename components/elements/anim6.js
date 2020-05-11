import '../../main.css'
import { fadeOutDown } from 'react-animations'
import COUNTRIES from '../../helpers/gpa-countries';
import SCHOLARSHIP_COUNTRIES from '../../helpers/scholarship-countries'
import Select, { components } from 'react-select';
import { StyleSheet, css, minify } from 'aphrodite';
import _ from 'lodash'
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

const AMOUNTS = [
	{ label: '$0 - $5,000', value: '$0 - $5,000' },
	{ label: '$5,000 - above', value: '$5,000 above' },
	{ label: 'Full Tuition', value: 'Full tuition' },
	{ label: 'Variable', value: 'Variable' },
];

const Anim6 = (props) =>{
    return(
        <span className={css(
            props.data.done?
            (styles.fadeOutDown, props.data.class)
            :
            null
            )}>
        <Select
                                      className="country-home"
                                      classNamePrefix="home-amount-select"
                                      placeholder={
                                        props.prevData.done?
                                          "What is the scholarship amount?"
                                          :null
                                      }
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={(e)=>props.onSelect(e)}
                                      name="countries"
                                      options={AMOUNTS}
                              /></span>
    )
}

export default Anim6;