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

const LEVELS = [
  {
  "label":"Undergraduate",
  "value":"Undergraduate"
  },
  {
  "label":"Graduate",
  "value":"Graduate"
  }
]

const Anim4 = (props) =>{
    return(
         <Select
         className={css(
            props.data.done?
            (styles.fadeOutDown, props.data.class)
            :
            null
            )}
                                      className="country-home"
                                      classNamePrefix="home-level-select"
                                      placeholder={
                                        props.prevData.done?
                                      "What is the level?"
                                      :null}
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={(e)=>props.onSelect(e)}
                                      name="countries"
                                      options={LEVELS}
                              />
    )
}

export default Anim4;