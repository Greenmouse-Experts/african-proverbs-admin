import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '@/utils/withAuth'
import {useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import FormDialog from '../../components/widgets/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import {fetchLanguages, deleteLanguage} from '../../store/actions/languageAction';
import Table from '../../components/UIElements/DataTable'
import Alert from '../../components/UIElements/Alert';
import ReactTooltip from "react-tooltip";
import LanguageForm from '../../parts/forms/languageForm';
import {checkPermission, convTime} from '../../utils/utilities';
import LanguageEthnic from './languageEthnic'

const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
      },
      button: {
          margin: "10px",
      },
  });

const Language = () => {
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false); 
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedElement, setSelectedElement] = React.useState();
    const { languages, isLoadinglanguages } = useSelector(state => state.Languages);
    const { isLoading, msg } = useSelector((state) => state.auth);
    const { user } = useSelector(state => state.auth);
    const [showEthnics, setShowEthnics] = useState(false)
    const [selectedEthnics, setSelectedEthnics] = useState()

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [fetchLanguages]);

    const openModal = () => {
        setOpen(true);
      };
    
      const openModalEdit = (value) => {
        const editvalue = languages.find((x) => x.id===value)
        setSelectedElement(editvalue);
        setOpenEdit(true);
      };
    
      const closeModal = () => {
        setOpen(false);
      };

      const closeModalEdit = () => {
        setOpenEdit(false);
      };

      const showEthnic =(value)=>{
        setShowEthnics(true)
        setSelectedEthnics(value);
      }

      const closeEthnic = ()=>{
        setShowEthnics(false)
      }

    const header = [
    { id: 's/n', title: 'S/N' },
    {
        id: 'name',
        title: 'Name',
    },
    {
        id: 'ethnics',
        title: 'Ethnics',
    },
    {
        id: 'date_created',
        title: 'Date Created',
    },
    {
        id: 'action',
        title: 'Action',
    },
    ];

    if (showEthnics){
        return (
            <LanguageEthnic selectedEthnics={selectedEthnics} fromLanguage={true} closeModaEthnicPagel={closeEthnic}/>
        );
    }

    return (
        <div class="content mt-2">
            {isLoadinglanguages && languages===null ? <div class="spinner">Loading...</div>   
            : 
             <>
            {msg ? <Alert payload={msg} /> : null }
            <div class="container-fluid">
                <div class="col-12">
                <div class="card-box">
                <div class="row">
                        <div class="col-lg-3">
                            <div class="widget">
                                <div class="widget-body">

                                {user && user.roles && ((checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin'))) | (checkPermission(user.roles, 'SuperAdmin')) ? 
                                <a href="#" onClick={() => openModal()} class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light">
                                <i class="fa fa-plus mr-1"></i> Add Language
                                </a>
                                : null}
                    
                                <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Category" >
                                    <DialogContent>
                                    <LanguageForm closeModal={closeModal} requestType="Create" />
                                    </DialogContent>
                                </FormDialog>

                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                                <Table tableHeader={header} title="Recent Languages">
                                {languages && languages.map((value, index) => {
                                    return (
                                        <tr key={value}>
                                            <td>{index + 1}</td>
                                            <td>{value.name}</td>
                                            <td className="text-center" style={{cursor: value.ethnic_counts>0 ? "pointer": "text",}} onClick={()=>value.ethnic_counts>0 ? showEthnic(value.name) : null}>{value.ethnic_counts}</td>
                                            <td>{convTime(value.date_created)}</td>
                                            {/* <td>{convTime(value.date_modified)}</td> */}
                                            <td>
                                                <ul class="list-inline mb-0">
                                                    {user && user.roles && ((checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin'))) ?
                                                    <>
                                                        <li class="list-inline-item">
                                                        <a class="icon circle-icon " data-tip data-for="edit" onClick={() => openModalEdit(value.id)}><i class="mdi mdi-circle-edit-outline  text-primary"></i></a>
                                                        <ReactTooltip id='edit' place="top" effect="solid">
                                                            Edit Language
                                                        </ReactTooltip>
                                                        </li>
                                                        <li class="list-inline-item">
                                                        <a class="icon circle-icon" data-tip data-for="delete" onClick={() => dispatch(deleteLanguage(value.id))}><i class="mdi mdi-delete text-danger"></i></a>
                                                        <ReactTooltip id='delete' place="top" effect="solid">
                                                            Delete Language
                                                        </ReactTooltip>
                                                        </li>
                                                    </>
                                                    : null }
                                                    </ul>
                                            </td>
                                        </tr>
                                    )
                                    }
                                    )}
                                </Table>

                                <FormDialog clickClose={closeModalEdit} clickOpen={() => openModalEdit(value.id)} open={openEdit}
                                    openBtnClass="dropdown-item" icon={<i class="fa fa-edit mr-2"></i>} action="Edit Category" >
                                    <DialogContent>
                                        <LanguageForm closeModal={closeModalEdit} languagedata={selectedElement} requestType="Edit" />
                                    </DialogContent>
                                </FormDialog>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </>
            }
        </div>


    )
} 
  
export default withAuth(Language);