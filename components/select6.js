import Select, { components } from 'react-select';
const AMOUNTS = [
	{ label: '$0 - $5,000', value: '$0 - $5,000' },
	{ label: '$5,000 - above', value: '$5,000 above' },
	{ label: 'Full Tuition', value: 'Full tuition' },
	{ label: 'Variable', value: 'Variable' },
];
const Select6 = (props) => {
    return(
        <Select
                className="input-gpa"
                classNamePrefix="gpa-select"
                placeholder="Amount"
                isClearable={true}
                isSearchable={true}
                onChange={(e)=> props.onSelect(e)}
                name="amount"
                instanceId={3}
                options={AMOUNTS}
              />
    )
}

export default Select6;