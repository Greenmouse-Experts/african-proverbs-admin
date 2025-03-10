import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from '@/utils/withAuth';
import { useForm, Controller } from 'react-hook-form';
import {
  fethUserAction,
  updateUserAction,
  createUserAction,
  fetchRoles,
  deleteUser,
} from '../../store/actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '../../components/widgets/Modal';
import ProverbModal from '../../components/widgets/ProverbModal';
import { Alert } from '../../components/UIElements';
import { formatCategoryOptions, formatEthnicOptions, checkPermission, OnlySuperAdmin } from '../../utils/utilities';
import {
  Select,
  MultiSelectComponent,
} from '../../components/UIElements/InputField';
import UserLoading from '../../parts/usersWidget/userLoading';
import {fetchEthnic} from '../../store/actions/ethnicAction';
import DialogContent from '@material-ui/core/DialogContent';
import Unauthorized from '../../parts/SubPages/Unauthorized'

const ViewProverb = () => {
  const router = useRouter();
  const classNamees = useStyles();
  const [searchParams, setSearchParams] = useState('');
  const [selected, setSelected] = useState([]);
  const [selectedEthnic, setSelectedEthnic] = useState([]);
  const [userStatus, setUserStatus] = useState('all');
  const [fetchState, setFetchState] = useState(true);
  const [open, setOpen] = useState(false);
  const [sentData, setData] = useState(null);
  const [updateValue, setUpdateValue] = useState('');
  const { users, isLoading, user_msg, roles } = useSelector(
    (state) => state.Users
  );
  const { user } = useSelector(state => state.auth);
  const { ethnics } = useSelector((state) => state.Ethnics);

  const [formData, setForm] = useState({
    email: '',
    password: 'MunaAdmin',
  });

  const { email, password } = formData;
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
      dispatch(fetchRoles());
      dispatch(fetchEthnic());
      setFetchState(false);
    }
  }, [updateValue]);

  const initialOption = [
    { label: 'Choose a permission', value: ' ', disabled: true },
  ];

  const initialEthnicOption = [
    { label: 'Choose an ethnic', value: ' ', disabled: true },
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
    setSelectedEthnic([]);
  };


  const onSubmit = (data) => {
    const {
      first_name,
      last_name,
      email,
      prefix,
      other_name,
      phone_number,
      ethnic,
      password1,
      password2,
    } = data;

    const newUser = {
      email,
      is_author: true,
      // is_suspended: false,
      roles: data.group.map((grp) => grp.value),
      assignedEthnic: ethnic.map((grp) => grp.value),
      author_profile: {
        first_name,
        last_name,
        phone_number,
        prefix,
        other_name
      },
    };
    // if (data.group){
    //   newUser['groups'] = data.group.map((grp) => grp.value);
    //   newUser['author_profile']['role'] = data.role;
    // }
    if (updateValue) {
      newUser['author_profile']['id'] = updateValue.author_profile?.id;
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

  // const filteredStatus = () => {
  //   if (userStatus === 'all') return users;
  //   return users.filter(
  //     (value) => value.roles.map(permission=>(permission.name.toLowerCase() === userStatus.toLowerCase()))
  //   );
  // };

  const filteredStatus = () => {
    if (userStatus === 'all') return users;
    return users.filter(function (value){return value.roles.some(permission => permission.name === userStatus)}
    );
  };

  const setUpdateValueHandler = (val) => {
    const formatSelectedCategory = formatCategoryOptions(val.roles);
    const formatSelectedEthnic = val.ethnics ? formatEthnicOptions(val.ethnics) : [];
    setSelected(formatSelectedCategory);
    setSelectedEthnic(formatSelectedEthnic);
    setUpdateValue(val);
  };

  const deleteHandler = (val) => {
    const isTrue = prompt('Type anything to proceed or cancel to leave');
    if (isTrue) return dispatch(deleteUser(val.id));
  };

  const viewUserHandler = (val) => {
    // router.push('/users/[id]', `/users/${val.id}`,);
    router.push({pathname: '/users/details',query: {q: val.id}});
    // router.push({
    //   pathname: `/users/${val.id}`,
    // });
  };

  return (
    <div className="content">
      
      <div className="container-fluid">
        {user_msg && <Alert key={new Date()} payload={user_msg} />}
        {/* {user && (user.role == 'Admin') || (user.role == 'SuperAdmin') ? ( */}
        {user && (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ? (
        <div className="row ">
          <div className="col-xl-12 card-box">
            <div className="row justify-content-between">
              <div className="col-xs-12 col-md-3 mb-1">
                <input
                  type="search"
                  name="searchParams"
                  onChange={onChangeHandler}
                  className="form-control form-control-sm"
                  placeholder="Search by Name"
                />
              </div>
              <div className="col-sm-12 col-md-3 mb-1">
                <div className="d-flex">
                  <select
                    name="userStatus"
                    onChange={onChangeHandler}
                    value={userStatus}
                    className="form-control form-control-sm mr-1"
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
                    className="btn btn-secondary py-0 px-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                    onClick={() => openModal(null)}
                  >
                    <i className="fas fa-user-plus" />
                  </button>
                </div>
              </div>
            </div>
            <div className="dropdown-divider my-1 mb-2"></div>
            <div className="row justify-between">
              {users ? (
                filteredStatus()
                  .filter((value) =>
                  value.author_profile?.first_name ? value.author_profile?.first_name
                      .toLowerCase()
                      .includes(searchParams.toLowerCase()) 
                      : value.author_profile?.last_name 
                      ? value.author_profile?.last_name.toLowerCase().includes(searchParams.toLowerCase()) 
                      : value.email.toLowerCase().includes(searchParams.toLowerCase())
                  )
                  .map((val) => (
                    <div className="col-xl-3 col-md-6">
                      <div className="card-box widget-user border p-2">
                        <div className="media">
                          <div className="avatar-lg mr-3">
                            <img
                              src="../static/assets/images/users/avatar.jpg"
                              className="img-fluid rounded-circle"
                              alt={val.author_profile?.first_name}
                            />
                          </div>
                          <div className="media-body overflow-hidden">
                            <h5 className="mt-0 mb-1 text-capitalize">
                              {val.author_profile?.prefix && val.author_profile?.prefix}{' '}{val.author_profile?.first_name}{' '}
                              {val.author_profile?.last_name}
                            </h5>
                            <p className="text-muted mb-2 font-13 text-truncate">
                              {val.email}
                            </p>
                            {/* <div className="d-flex justify-content-between align-items-center">
                              <small
                                className={
                                  val.author_profile.role.toLowerCase() ===
                                  'publisher'
                                    ? 'text-danger'
                                    : val.author_profile.role.toLowerCase() ===
                                      'author'
                                    ? 'text-primary'
                                    : val.author_profile.role.toLowerCase() ===
                                      'creator'
                                    ? 'text-secondary'
                                    : 'text-warning'
                                }
                              >
                                <b>{val.author_profile.role}</b>
                              </small>
                            </div> */}
                            <div className="d-flex justify-content-between mt-2">
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                  <a
                                    onClick={() => viewUserHandler(val)}
                                    className="icon circle-icon"
                                  >
                                    <i className="mdi mdi-eye text-purple"></i>
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    onClick={() => deleteHandler(val)}
                                    className="icon circle-icon"
                                  >
                                    <i className="mdi mdi-delete text-danger"></i>
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    onClick={() => setUpdateValueHandler(val)}
                                    className="icon circle-icon"
                                  >
                                    <i className="mdi mdi-circle-edit-outline  text-primary"></i>
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
                  <h1 className="text-error">401</h1>
                  <h3 className="mt-3 mb-2">You are not Authorized to view page</h3>
                </UserLoading>
              )}
            </div>
          </div>
        </div>
        
      ): <Unauthorized />}

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
                <div className="row">
                  {/* First Name */}
                  <div className="col-md-6 mb-1">
                  <label for="prefix" className="col-form-label">Prefix</label>
                    <Select name='prefix' id="prefix" ref={register({ required: true })}>
                        {updateValue && <option value={updateValue.author_profile?.prefix}>{updateValue.author_profile?.prefix}</option>}
                        <option value=''>Choose</option>
                        <option value='Mr'>Mr</option>
                        <option value='Mrs'>Mrs.</option>
                        <option value='Miss'>Miss.</option>
                        <option value='Prof'>Prof.</option>
                        <option value='Dr'>Dr.</option>
                    </Select>
                    {errors.prefix && <span className={classNamees.error}>This Field is Required</span>}
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="control-label">First Name</label>
                    <input
                      className="form-control"
                      name="first_name"
                      id="first_name"
                      type="first_name"
                      defaultValue={
                        updateValue && updateValue.author_profile?.first_name
                      }
                      placeholder="Enter your first_name"
                      ref={register({
                        required: true,
                      })}
                    />
                    {errors.first_name && (
                      <span className={classNamees.errorMsg}>
                        'This field is required'
                      </span>
                    )}
                  </div>
                  {/* Last Name */}
                  <div className="col-md-6 mb-1">
                    <label className="control-label">Last Name</label>
                    <input
                      className="form-control"
                      name="last_name"
                      id="last_name"
                      type="last_name"
                      defaultValue={
                        updateValue && updateValue.author_profile?.last_name
                      }
                      placeholder="Enter your last_name"
                      ref={register({
                        required: true,
                      })}
                    />
                    {errors.last_name && (
                      <span className={classNamees.errorMsg}>
                        'This field is required'
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="control-label">Other Name</label>
                    <input
                      className="form-control"
                      name="other_name"
                      id="other_name"
                      type="other_name"
                      defaultValue={
                        updateValue && updateValue.author_profile?.other_name
                      }
                      placeholder="Enter your other_name"
                      ref={register({
                        required: false,
                      })}
                    />
                    {/* {errors.other_name && (
                      <span className={classNamees.errorMsg}>
                        'This field is required'
                      </span>
                    )} */}
                  </div>

                  {/* Phone Number Here */}
                  {/* Phone Number */}
                  <div className="col-md-6 mb-1">
                    <label className="control-label"> Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone_number"
                      id="phone_number"
                      defaultValue={
                        updateValue && updateValue.author_profile?.phone_number
                      }
                      placeholder="Enter your phone_number"
                      ref={register({
                        required: true,
                      })}
                    />
                    {errors.phone_number && (
                      <span className={classNamees.errorMsg}>
                        'This field is required'
                      </span>
                    )}
                  </div>

                  {/* Group */}
                  <div className="form-group col-md-6">
                      <label for="inputState" className="control-label">
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
                        <span className={classNamees.errorMsg}>
                          This field is required
                        </span>
                      )}
                    </div>
                   

                  {/* Ethnics */}
                  <div className="form-group col-md-6">
                    <label for="inputState" className="control-label">
                      Ethnics
                    </label>
                    <Controller
                      control={control}
                      name="ethnic"
                      defaultValue={selectedEthnic}
                      rules={{
                        validate: (value) =>
                          value.length > 0 ||
                          'A user must have ethnics',
                        required: true,
                      }}
                      render={({ onChange, onBlur, value }) => (
                        <MultiSelectComponent
                          options={
                            ethnics
                              ? formatEthnicOptions(ethnics)
                              : initialEthnicOption
                          }
                          value={value || ''}
                          onChange={(ethnic, delta, source, editor) =>
                            onChange(ethnic)
                          }
                          labelledBy={'Select'}
                          name="ethnic"
                          ref={register({ required: true })}
                        />
                      )}
                    />
                    {errors.ethnic && (
                      <span className={classNamees.errorMsg}>
                        This field is required
                      </span>
                    )}
                  </div>

                  {/* Email Form Field */}
                  <div className="col-md-6 mb-1">
                    <label className="control-label">User's Email</label>
                    <input
                      className="form-control"
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
                      <span className={classNamees.errorMsg}>
                        {errors.email.message
                          ? errors.email.message
                          : 'This field is required'}
                      </span>
                    )}
                  </div>

                  {/* suspend user */}
                  {updateValue && (
                    <div className="col-md-6 mb-1">
                      <div className="form-group">
                          <div className="checkbox">
                              <input id="checkbox-suspend" defaultChecked={updateValue.is_suspended} type="checkbox" name="suspend" ref={register({required:false})}/>
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
                      <div className="col-md-6 mb-1">
                        <label className="control-label">password</label>
                        <input
                          className="form-control"
                          name="password1"
                          type="password"
                          id="password1"
                          placeholder="Password"
                          autoComplete="new-password"
                          readonly
                          ref={register({ required: true, minLength: 7 })}
                        />
                        {errors.password1 && (
                          <span className={classNamees.errorMsg}>
                            This field is required
                            {errors.password1.type === 'minLength' &&
                              'and min length of 7'}
                          </span>
                        )}
                      </div>
                      {/* Password Form Field */}
                      <div className="col-md-6 mb-1">
                        <label className="control-label">Confirm password</label>
                        <input
                          className="form-control"
                          name="password2"
                          type="password"
                          id="password2"
                          placeholder="Confirm password"
                          ref={register({ required: true, minLength: 7 })}
                        />
                        {errors.password2 && (
                          <span className={classNamees.errorMsg}>
                            This field is required
                            {errors.password2.type === 'minLength' &&
                              'and min length of 7'}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  <div className=" col-md-12">
                    <button
                      type="submit"
                      className="btn btn-success waves-effect waves-light w-100 mt-1"
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
