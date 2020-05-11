import Select, { components } from 'react-select';
const LEVELS = [
	{ label: 'Graduate', value: 'Graduate' },
    { label: 'Undergraduate', value: 'Undergraduate' }
];
const Select2 = (props) => {
    return(
        <Select
                                      className="country"
                                      classNamePrefix="country-select"
                                      placeholder="Select Level"
                                      onChange={(e)=> props.onSelect(e)}
                                      name="levels"
                                      options={LEVELS}
                                    />
    )
}

export default Select2;