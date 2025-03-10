import React, { useEffect, useState } from 'react'
import { deleteEthnic } from '../../store/actions/ethnicAction';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/UIElements/DataTable'
import ReactTooltip from "react-tooltip";
import { checkPermission } from '../../utils/utilities';

const EthnicTable = ({ ethnics, openModalEdit, showProverb, fromLanguage }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);


    const header = [
        { id: 's/n', title: 'S/N' },
        {
            id: 'name',
            title: 'Name',
        },
        {
            id: 'language',
            title: 'Language',
        },
        {
            id: 'location',
            title: 'Location',
        },
        {
            id: 'proverbs',
            title: 'Proverbs',
        },
    ];
    if (!fromLanguage) {
        header.push({
            id: 'action',
            title: 'Actions',
        })
    }


    return (
        <div class="col-lg-12">
            <Table tableHeader={header} id="datatable-buttons" title="Recent Ethnic Groups">
                {ethnics && ethnics.length > 0 ?
                    (ethnics?.map((value, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.name}</td>
                            <td>{value.language && value.language.name}</td>
                            <td style={{ whiteSpace: 'break-spaces' }}>
                                {value.country && value.country.length > 0 && (
                                    <span>
                                        {value.country.map((val, countryIndex) => (
                                            <span key={countryIndex}>
                                                {val.name}
                                                {countryIndex < value.country.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </span>
                                )}
                            </td>

                            <td onClick={fromLanguage ? (() => showProverb(value.name)) : null}>{value.proverb_counts}</td>
                            {(!fromLanguage) && (
                                <td>
                                    <ul class="list-inline mb-0">
                                        {user && user.roles && ((checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin'))) ?
                                            <>
                                                <li class="list-inline-item">
                                                    <a class="icon circle-icon " data-tip data-for="edit" onClick={() => openModalEdit(value.id)}><i class="mdi mdi-circle-edit-outline  text-primary"></i></a>
                                                    <ReactTooltip id='edit' place="top" effect="solid">
                                                        Edit
                                                    </ReactTooltip>
                                                </li>
                                            </> : null}


                                        <li class="list-inline-item">
                                            <a class="icon circle-icon" data-tip data-for="delete" onClick={() => dispatch(deleteEthnic(value.id))}><i class="mdi mdi-delete text-danger"></i></a>
                                            <ReactTooltip id='delete' place="top" effect="solid">
                                                Delete
                                            </ReactTooltip>
                                        </li>

                                    </ul>
                                </td>)
                            }
                        </tr>
                    )
                    ))
                    : <h3>No data availaible</h3>}
            </Table>
        </div>


    )
}

export default EthnicTable;