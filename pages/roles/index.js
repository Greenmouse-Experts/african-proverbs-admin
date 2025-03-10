import React, {useEffect, useState} from 'react'
import withAuth from '@/utils/withAuth'
import Table from '../../components/UIElements/DataTable';
import {getFMRoles, deletePVRoles} from '../../store/actions/pv_admin_rolesAction';
import { useSelector, useDispatch } from 'react-redux';
import {checkPermission} from '../../utils/utilities';
import ReactTooltip from "react-tooltip";
import RoleForm from '../../parts/forms/roleForm'
import Alert from '../../components/UIElements/Alert'

const Roles = () => {

    const { roles } = useSelector(state => state.pv_roles);
    const { user, msg } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [edit, setOpenEdit] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        dispatch(getFMRoles());
    }, [getFMRoles]);

    const openEditRole = (value) => {
        setOpenEdit(true);
        setData(value)
    }

    const closeEditRole = () => {
        setOpenEdit(false);
    }

    const header = [
        { id: 's/n', title: 'S/N' },
        {
            id: 'name',
            title: 'Name',
        },
        {
            id: 'action',
            title: 'Action',
        },
        ];
  return (
    <div class="row">
        {msg ? <Alert payload={msg} /> : null }
        <div class="col-md-6">
            <div class="card-box">
                <Table tableHeader={header} title="ProverbAdmin Roles">
                    {roles && roles.length > 0 ? roles.map((value, index) => {
                        return (
                            <tr key={value}>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>
                                    <ul class="list-inline mb-0">
                                        {user && user.roles && ((checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin'))) ?
                                        <>
                                            <li class="list-inline-item">
                                            <a class="icon circle-icon " data-tip data-for="edit" onClick={() => openEditRole(value)}><i class="mdi mdi-circle-edit-outline  text-primary"></i></a>
                                            <ReactTooltip id='edit' place="top" effect="solid">
                                                Edit Role Name
                                            </ReactTooltip>
                                            </li>
                                            <li class="list-inline-item">
                                            <a class="icon circle-icon" data-tip data-for="delete" onClick={() => dispatch(deletePVRoles(value.id))}><i class="mdi mdi-delete text-danger"></i></a>
                                            <ReactTooltip id='delete' place="top" effect="solid">
                                                Delete Role
                                            </ReactTooltip>
                                            </li>
                                        </>
                                        : null }
                                        </ul>
                                </td>
                            </tr>
                            )
                        }
                        ) : null }
                </Table>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card-box">
            
                {edit ? <RoleForm title="Edit"  role={data} closeEdit={closeEditRole}/> : <RoleForm title="Add"/>}
            </div>
        </div>
    </div>
  )
}

export default withAuth(Roles);