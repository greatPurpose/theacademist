import Select, { components } from 'react-select';
const STATES = [
	{ label: 'All', value: 'All' },
    { label: 'AK', value: 'AK' }
];
const Select3 = (props) => {
    return(
        <Select
                className="input-gpa"
                classNamePrefix="gpa-select"
                placeholder="State"
                isClearable={true}
                isSearchable={true}
                onChange={(e)=> props.onSelect(e)}
                name="states"
                instanceId={3}
                options={STATES}
              />
    )
}

export default Select3;