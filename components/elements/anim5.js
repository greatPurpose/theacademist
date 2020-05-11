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

const Anim5 = (props) =>{
    return(
         <Select
         className={css(
          props.data.done?
          (styles.fadeOutDown, props.data.class)
          :
          null
          )}
                                      className="country-home"
                                      classNamePrefix="home-gpa1-select"
                                      placeholder={
                                        props.prevData.done?
                                          "What is your gpa?"
                                          :null}
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={(e)=>props.onSelect(e)}
                                      name="countries"
                                       options={GPAS}
                              />
    )
}

export default Anim5;