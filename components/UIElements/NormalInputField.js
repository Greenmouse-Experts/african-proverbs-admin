import { Restaurant } from '@material-ui/icons';
import React from 'react';

function InputField({...rest}) {
  return (
    <>
      {/* <div class="form-group">
        <label for="category">Category* </label> */}
        <input
          type="text"
          // name="category"
          // maxlength="500"
          // parsley-trigger="change"
          // required 
          // placeholder="Create Category"
          class="form-control"
          // id="category"
          // ref={register({ required: true })}
          {...rest}
        />
        {/* {errors.category && <span>This field is required</span>} */}
      {/* </div> */}
    </>
  );
}

export default InputField;
