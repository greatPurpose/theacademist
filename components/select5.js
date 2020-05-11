import Select, { components } from 'react-select';
const CRITERIAS = [
	{ label: 'Merit', value: 'Merit' },
    { label: 'Need', value: 'Need' }
];
const Select5 = (props) => {
    return(
        <Select
                className="input-gpa"
                classNamePrefix="gpa-select"
                placeholder="Criteria"
                isClearable={true}
                isSearchable={true}
                onChange={(e)=> props.onSelect(e)}
                name="criteria"
                instanceId={3}
                options={CRITERIAS}
              />
    )
}

export default Select5;