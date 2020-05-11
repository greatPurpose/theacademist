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


const Anim1 = (props) =>{
    return(
        <Select
                                      className={css(
                                        props.data.done?
                                        (styles.fadeOutDown, props.data.class)
                                        :
                                        null
                                        )}
                                      classNamePrefix="home-country-select"
                                      placeholder="What country are you seeking a scholarship?"
                                      isClearable={true}
                                      isSearchable={true}
                                      onChange={(e)=>props.onSelect(e)}
                                      name="countries"
                                      components={{ Option: IconOption, SingleValue, SelectContainer }}
                                      options={SCHOLARSHIP_COUNTRIES}
                                      />
    )
}

export default Anim1;