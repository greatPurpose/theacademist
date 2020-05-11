import Select, { components } from 'react-select';
import SCHOLARSHIP_COUNTRIES from '../helpers/scholarship-countries'
const COUNTRIES = [
  { id: 34, label: 'Canada', value: 'Canada',icon: 'https://theacademist-new.herokuapp.com/static/flags/206-canada.svg' },
  { id: 34, label: 'United States', value: 'US',icon: 'https://theacademist-new.herokuapp.com/static/flags/153-united-states-of-america.svg' },
]
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
const Select4 = (props) => {
    return(
      <Select
                                      className="country"
                                      classNamePrefix="country-select"
                                      placeholder="Select Country"
                                      onChange={(e)=> props.onSelect(e)}
                                      name="countries"
                                      components={{ Option: IconOption, SingleValue, SelectContainer }}
                                      options={COUNTRIES}
                                    />
      
    )
}

export default Select4;