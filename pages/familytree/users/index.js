import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from '@/utils/withAuth';
import { useForm, Controller } from 'react-hook-form';
import {
  fethUserAction,
  updateUserAction,
  createUserAction,
  deleteUser,
} from '@/store/actions/fm_FamilyUserAction';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '@/components/widgets/Modal';
import ProverbModal from '@/components/widgets/ProverbModal';
import { Alert } from '@/components/UIElements';
import { formatCategoryOptions, checkPermission, OnlySuperAdmin } from '@/utils/utilities';
import {
  Select,
  MultiSelectComponent,
} from '@/components/UIElements/InputField';
import UserLoading from '@/parts/usersWidget/userLoading';
import DialogContent from '@material-ui/core/DialogContent';
import Unauthorized from '@/parts/SubPages/Unauthorized'

const ViewProverb = () => {
  const router = useRouter();
  const classes = useStyles();
  const [searchParams, setSearchParams] = useState('');
  const [selected, setSelected] = useState([]);
  const [userStatus, setUserStatus] = useState('all');
  const [fetchState, setFetchState] = useState(true);
  const [open, setOpen] = useState(false);
  const [sentData, setData] = useState(null);
  const [updateValue, setUpdateValue] = useState('');
  const { users, isLoading, user_msg, roles } = useSelector(
    (state) => state.FamilyAdminUsers
  );
  const { user } = useSelector(state => state.auth);


  const dispatch = useDispatch();

  const { handleSubmit, control, reset, register, errors } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (updateValue) {
      openModal(null);
    }
    if (fetchState) {
      dispatch(fethUserAction());
      setFetchState(false);
    }
  }, [updateValue]);

  const initialOption = [
    { label: 'Choose a permission', value: ' ', disabled: true },
  ];

  const openModal = (value) => {
    setData(value);
    setOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setOpen(false);
    setUpdateValue('');
    setSelected([]);
  };


  const onSubmit = (data) => {
    const {
      first_name,
      last_name,
      email,
      prefix,
      other_name,
      phone_number,
      password1,
      password2,
    } = data;

    const newUser = {
      email,
      is_author: true,
      // is_suspended: false,
      roles: data.group.map((grp) => grp.value),
      author_profile: {
        first_name,
        last_name,
        phone_number,
        prefix,
        other_name
      },
    };
    if (updateValue) {
      newUser.author_profile.id = updateValue.author_profile.id;
      const urlID = updateValue.id;
      newUser.is_suspended = data.suspend;
      dispatch(updateUserAction(newUser, urlID));
    } else {
      newUser.password1 = password1;
      newUser.password2 = password2;
      newUser.is_suspended = false;
      if (password1 !== password2) return alert('password wrong');
      dispatch(createUserAction(newUser));
    }
    closeModal();
  };

  const onChangeHandler = (e) => {
    e.target.name === 'userStatus'
      ? setUserStatus(e.target.value)
      : setSearchParams(e.target.value);
  };


  const filteredStatus = () => {
    if (userStatus === 'all') return users;
    return users.filter(function (value) { return value.roles.some(permission => permission.name === userStatus) }
    );
  };

  const setUpdateValueHandler = (val) => {
    const formatSelectedCategory = formatCategoryOptions(val.roles);
    setSelected(formatSelectedCategory);
    setUpdateValue(val);
  };

  const deleteHandler = (val) => {
    const isTrue = prompt('Type anything to proceed or cancel to leave');
    if (isTrue) return dispatch(deleteUser(val.id));
  };

  const viewUserHandler = (val) => {
    router.push({ pathname: '/users/details', query: { q: val.id } });
  };

  return (
    <div class="content">

      <div class="container-fluid">
        {user_msg && <Alert key={new Date()} payload={user_msg} />}
        {user && (checkPermission(user.roles, 'SuperAdmin')) ? (
          <div class="row ">
            <div class="col-xl-12 card-box">
              <div class="row justify-content-between">
                <div class="col-xs-12 col-md-3 mb-1">
                  <input
                    type="search"
                    name="searchParams"
                    onChange={onChangeHandler}
                    class="form-control form-control-sm"
                    placeholder="Search by Name"
                  />
                </div>
                <div class="col-sm-12 col-md-3 mb-1">
                  <div class="d-flex">
                    <select
                      name="userStatus"
                      onChange={onChangeHandler}
                      value={userStatus}
                      class="form-control form-control-sm mr-1"
                    >
                      {roles !== null ? (
                        <>
                          <option value="all">All</option>
                          {roles.map((permission) => (
                            <option key={permission.id} value={permission.name}>
                              {permission.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option> loading... </option>
                      )}
                    </select>

                    <button
                      type="button"
                      class="btn btn-secondary py-0 px-1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Tooltip on top"
                      onClick={() => openModal(null)}
                    >
                      <i class="fas fa-user-plus" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="dropdown-divider my-1 mb-2"></div>
              <div class="row justify-between">
                {users ? (
                  filteredStatus()
                    .filter((value) =>
                      value.author_profile.first_name
                        .toLowerCase()
                        .includes(searchParams.toLowerCase())
                    )
                    .map((val) => (
                      <div class="col-xl-3 col-md-6">
                        <div class="card-box widget-user border p-2">
                          <div class="media">
                            <div class="avatar-lg mr-3">
                              <img
                                src="../static/assets/images/users/avatar.jpg"
                                class="img-fluid rounded-circle"
                                alt={val.author_profile.first_name}
                              />
                            </div>
                            <div class="media-body overflow-hidden">
                              <h5 class="mt-0 mb-1 text-capitalize">
                                {val.author_profile.prefix && val.author_profile.prefix}{' '}{val.author_profile.first_name}{' '}
                                {val.author_profile.last_name}
                              </h5>
                              <p class="text-muted mb-2 font-13 text-truncate">
                                {val.email}
                              </p>
                              <div class="d-flex justify-content-between mt-2">
                                <ul class="list-inline mb-0">
                                  <li class="list-inline-item">
                                    <a
                                      onClick={() => viewUserHandler(val)}
                                      class="icon circle-icon"
                                    >
                                      <i class="mdi mdi-eye text-purple"></i>
                                    </a>
                                  </li>
                                  <li class="list-inline-item">
                                    <a
                                      onClick={() => deleteHandler(val)}
                                      class="icon circle-icon"
                                    >
                                      <i class="mdi mdi-delete text-danger"></i>
                                    </a>
                                  </li>
                                  <li class="list-inline-item">
                                    <a
                                      onClick={() => setUpdateValueHandler(val)}
                                      class="icon circle-icon"
                                    >
                                      <i class="mdi mdi-circle-edit-outline  text-primary"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <UserLoading>
                    <h1 class="text-error">401</h1>
                    <h3 class="mt-3 mb-2">You are not Authorized to view page</h3>
                  </UserLoading>
                )}
              </div>
            </div>
          </div>

        ) : <Unauthorized />}

        {/* User Form Moday Body */}
        <FormDialog
          clickClose={closeModal}
          clickOpen={openModal}
          open={open}
          action="Add Category"
        >
          <DialogContent>
            <ProverbModal
              closeModal={closeModal}
              name={updateValue ? 'Update User' : 'Create New User'}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="new-form"
                role="form"
                autocomplete="off"
              >
                <div class="row">
                  {/* First Name */}
                  <div class="col-md-6 mb-1">
                    <label for="prefix" class="col-form-label">Prefix</label>
                    <Select name='prefix' id="prefix" ref={register({ required: true })}>
                      {updateValue && <option value={updateValue.author_profile.prefix}>{updateValue.author_profile.prefix}</option>}
                      <option value=''>Choose</option>
                      <option value='Mr'>Mr</option>
                      <option value='Mrs'>Mrs.</option>
                      <option value='Miss'>Miss.</option>
                      <option value='Prof'>Prof.</option>
                      <option value='Dr'>Dr.</option>
                    </Select>
                    {errors.prefix && <span className={classes.error}>This Field is Required</span>}
                  </div>

                  <div class="col-md-6 mb-1">
                    <label class="control-label">First Name</label>
                    <input
                      class="form-control"
                      name="first_name"
                      id="first_name"
                      type="first_name"
                      defaultValue={
                        updateValue && updateValue.author_profile.first_name
                      }
                      placeholder="Enter your first_name"
                      ref={register({
                        required: true,
                      })}
                    />
                    {errors.first_name && (
                      <span className={classes.errorMsg}>
                        'This field is required'
                      </span>
                    )}
                  </div>
                  {/* Last Name */}
                  <div class="col-md-6 mb-1">
                    <label class="control-label">Last Name</label>
                    <input
                      class="form-control"
                      name="last_name"
                      id="last_name"
                      type="last_name"
                      defaultValue={
                        updateValue && updateValue.author_profile.last_name
                      }
                      placeholder="Enter your last_name"
                      ref={register({
                        required: true,
                      })}
                    />
                    {errors.last_name && (
                      <span className={classes.errorMsg}>
                        'This field is required'
                      </span>
                    )}
                  </div>

                  <div class="col-md-6 mb-1">
                    <label class="control-label">Other Name</label>
                    <input
                      class="form-control"
                      name="other_name"
                      id="other_name"
                      type="other_name"
                      defaultValue={
                        updateValue && updateValue.author_profile.other_name
                      }
                      placeholder="Enter your other_name"
                      ref={register({
                        required: false,
                      })}
                    />
                  </div>

                  {/* Phone Number */}
                  <div class="col-md-6 mb-1">
                    <label class="control-label"> Phone Number</label>
                    <input
                      type="tel"
                      class="form-control"
                      name="phone_number"
                      id="phone_number"
                      defaultValue={
                        updateValue && updateValue.author_profile.phone_number
                      }
                      placeholder="Enter your phone_number"
                      ref={register({
                        required: true,
                      })}
                    />
                    {errors.phone_number && (
                      <span className={classes.errorMsg}>
                        'This field is required'
                      </span>
                    )}
                  </div>

                  {/* Group */}
                  <div class="form-group col-md-6">
                    <label for="inputState" class="control-label">
                      roles
                    </label>
                    <Controller
                      control={control}
                      name="group"
                      defaultValue={selected}
                      rules={{
                        validate: (value) =>
                          value.length > 0 ||
                          'User can have more than one permission',
                        required: true,
                      }}
                      render={({ onChange, onBlur, value }) => (
                        <MultiSelectComponent
                          options={
                            roles
                              ? formatCategoryOptions(OnlySuperAdmin(user.roles, roles))
                              : initialOption
                          }
                          value={value || ''}
                          onChange={(permission, delta, source, editor) =>
                            onChange(permission)
                          }
                          labelledBy={'Select'}
                          name="permission"
                          ref={register({ required: true })}
                        />
                      )}
                    />
                    {errors.group && (
                      <span className={classes.errorMsg}>
                        This field is required
                      </span>
                    )}
                  </div>

                  {/* Email Form Field */}
                  <div class="col-md-6 mb-1">
                    <label class="control-label">User's Email</label>
                    <input
                      class="form-control"
                      name="email"
                      id="email"
                      type="email"
                      autoComplete="new-email"
                      readonly
                      defaultValue={updateValue && updateValue.email}
                      placeholder="Enter your email"
                      ref={register({
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Enter a valid e-mail address',
                        },
                      })}
                    />
                    {errors.email && (
                      <span className={classes.errorMsg}>
                        {errors.email.message
                          ? errors.email.message
                          : 'This field is required'}
                      </span>
                    )}
                  </div>

                  {/* suspend user */}
                  {updateValue && (
                    <div class="col-md-6 mb-1">
                      <div class="form-group">
                        <div class="checkbox">
                          <input id="checkbox-suspend" defaultChecked={updateValue.is_suspended} type="checkbox" name="suspend" ref={register({ required: false })} />
                          <label for="checkbox-suspend">
                            Suspend User
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Password Form Field */}
                  {!updateValue && (
                    <>
                      <div class="col-md-6 mb-1">
                        <label class="control-label">password</label>
                        <input
                          class="form-control"
                          name="password1"
                          type="password"
                          id="password1"
                          placeholder="Password"
                          autoComplete="new-password"
                          readonly
                          ref={register({ required: true, minLength: 7 })}
                        />
                        {errors.password1 && (
                          <span className={classes.errorMsg}>
                            This field is required
                            {errors.password1.type === 'minLength' &&
                              'and min length of 7'}
                          </span>
                        )}
                      </div>
                      {/* Password Form Field */}
                      <div class="col-md-6 mb-1">
                        <label class="control-label">Confirm password</label>
                        <input
                          class="form-control"
                          name="password2"
                          type="password"
                          id="password2"
                          placeholder="Confirm password"
                          ref={register({ required: true, minLength: 7 })}
                        />
                        {errors.password2 && (
                          <span className={classes.errorMsg}>
                            This field is required
                            {errors.password2.type === 'minLength' &&
                              'and min length of 7'}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  <div class=" col-md-12">
                    <button
                      type="submit"
                      class="btn btn-success waves-effect waves-light w-100 mt-1"
                    >
                      {updateValue ? <span>Update</span> : <span>Create</span>}
                    </button>
                  </div>
                </div>
              </form>
            </ProverbModal>
          </DialogContent>
        </FormDialog>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  errorMsg: {
    color: 'red',
    fontSize: 11,
  },
}));

export default withAuth(ViewProverb);
