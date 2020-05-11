import Select, { components } from 'react-select';
import SCHOLARSHIP_COUNTRIES from '../helpers/scholarship-countries'
import COUNTRIES from '../helpers/gpa-countries';
import {getMajorsCall} from '../calls/misc'
import {connect} from 'react-redux'
const { Option } = components;
const SelectContainer = ({ children, ...props }) => {
  return (
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
  );
};

class Select8 extends React.Component{
    componentDidMount = async()=> {
        await this.props.getMajors('https://www.theacademist.com/services/get-majors')
    }
    render(){
    return(
        <React.Fragment>
        {this.props.major?
      <Select
                                      className="country"
                                      classNamePrefix="country-select"
                                      placeholder="Select Major"
                                      onChange={(e)=> this.props.onSelect(e)}
                                      name="applicant_countries"
                                      options={this.props.major}
                                    />
                                    :
                                    <Select
                                    className="country"
                                    classNamePrefix="country-select"
                                    placeholder="Select Major"
                                    onChange={(e)=> this.props.onSelect(e)}
                                    name="applicant_countries"
                                  />}
            </React.Fragment>
      
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
  export default connect(mapper, mapDispatchToProps)(Select8);