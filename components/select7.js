import Select, { components } from 'react-select';
import SCHOLARSHIP_COUNTRIES from '../helpers/scholarship-countries'
import COUNTRIES from '../helpers/gpa-countries';
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
const Select7 = (props) => {
    return(
      <Select
                                      className="country"
                                      classNamePrefix="country-select"
                                      placeholder="Select Applicant Country"
                                      onChange={(e)=> props.onSelect(e)}
                                      name="applicant_countries"
                                      components={{ Option: IconOption, SingleValue, SelectContainer }}
                                      options={COUNTRIES}
                                    />
      
    )
}

export default Select7;