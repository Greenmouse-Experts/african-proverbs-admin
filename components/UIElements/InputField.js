import PropTypes from 'prop-types';
import MultiSelect from 'react-multi-select-component';
import React from 'react'

const Input = ({ children, ...rest }) => {
  return (
    <>
      <input type="text" class="form-control" {...rest} />
    </>
  );
};

Input.propTypes = {};


const TextArea = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <>
      <textarea ref={ref} class="form-control" rows="5" {...rest}/>
    </>
  );
});



// Select Setup
const Select = React.forwardRef(({children,  ...rest }, ref) => {
  return (
    <>
      <select ref={ref} class="form-control" {...rest}>
        {children}
        {/* <option>Choose</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option> */}
      </select>
    </>
  );
});

Select.propTypes = {};

// MultiSelect Setup
const MultiSelectComponent = React.forwardRef(({ options, ...rest }, ref) => {
  return (
    <>
      <MultiSelect
        options={options}
        ref={ref}
        {...rest}
        
      />
    </>
  );
});

MultiSelectComponent.propTypes = {
  options: PropTypes.array.isRequired
};

export { Input, Select, MultiSelectComponent,TextArea };
