import React from 'react'
import {useForm} from 'react-hook-form';
import {createPVRoles, updatePVRoles} from '../../store/actions/pv_admin_rolesAction';
import { useDispatch } from 'react-redux';

const RolesForm = ({title, role, closeEdit}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data, e) => {
        console.log(data.role);
        const alldata = {
            name: data.role
        };
        await dispatch(createPVRoles(alldata));
        e.target.reset();
    }

    const onSubmitEdit = async (data, e) => {
        const alldata = {
            id: role.id,
            name: data.role
        };
        console.log(alldata);
        await dispatch(updatePVRoles(alldata));
        e.target.reset();
        closeEdit();
    }

  return (
  <>
    <h4 class="header-title mt-0 mb-3">{title} role</h4>
    <form class="form-horizontal" onSubmit={handleSubmit(title==="Edit" ? onSubmitEdit : onSubmit)} role="form" data-parsley-validate novalidate>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-4 col-form-label">{title} role*</label>
                <div class="col-sm-7">
                    <input type="text" required name="role" class="form-control" defaultValue={role ? role.name : ""}
                            id="inputEmail3" placeholder="Add role" ref={register({ required: true })}/>
                            {errors.role && <span style={{color:"red"}}>This field is required</span>}
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-sm-4 col-sm-8">
                    <button type="submit" class="btn btn-primary waves-effect waves-light mr-1">
                        {title} role
                    </button>
                    <button type="reset" onClick={closeEdit}
                            class="btn btn-secondary waves-effect waves-light">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
  </>
   
  )
}

export default RolesForm