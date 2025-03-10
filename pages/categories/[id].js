import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '@/utils/withAuth'
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategoryId,
    deleteCategoryNativeName
} from '../../store/actions/categoryNativeAction';
import { useRouter } from 'next/router';
import { fetchLanguages } from '../../store/actions/languageAction';
import CategoryNativeForm from '../../parts/forms/categoryNativeForm'
import FormDialog from '../../components/widgets/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '../../components/UIElements/DataTable'
import Alert from '../../components/UIElements/Alert';
import ReactTooltip from "react-tooltip";
import { checkPermission } from '../../utils/utilities'


const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
    },
    button: {
        margin: "10px",
    },
});

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
        id: 'action',
        title: 'Action',
    },
];


const CategoryNativeName = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedElement, setSelectedElement] = React.useState();
    const dispatch = useDispatch();
    const router = useRouter();
    const { nativenames, isLoadingcategoriesnative } = useSelector(state => state.CategoryNativeName);
    const { languages, isLoadinglanguages } = useSelector(state => state.Languages);
    const { user, isLoading, msg } = useSelector((state) => state.auth);

    const { id } = router.query;

    // console.log(id);

    useEffect(() => {
        dispatch(fetchLanguages());
        dispatch(fetchCategoryId(id));
    }, [fetchLanguages, fetchCategoryId, id]);


    const openModal = () => {
        setOpen(true);
    };

    const openModalEdit = (value) => {
        setOpenEdit(true);
        const editvalue = nativenames.categorynativenames.find((x) => x.id === value)
        setSelectedElement(editvalue)
    };

    const closeModal = () => {
        setOpen(false);
    };

    const closeModalEdit = () => {
        setOpenEdit(false);
    };

    // const selectedCategory = {
    //     id: id,
    //     name: categorynativenames.name
    // }

    return (
        <div class="content">
            {isLoadingcategoriesnative && nativenames === null ? <div class="spinner">Loading...</div>
                :
                <>
                    {msg ? <Alert payload={msg} /> : null}
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card-box">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <div class="widget">
                                                        <div class="widget-body">
                                                            {user && (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                                                <a href="#" onClick={() => openModal()} class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light">
                                                                    <i class="fa fa-plus mr-1"></i> Add Category Native-Name
                                                                </a>
                                                                : <a href="#" class="btn btn-lg btn-secondary font-16 btn-block waves-effect waves-light">
                                                                    <i class="fa fa-plus mr-1"></i> Add Category Native-Name
                                                                </a>
                                                            }


                                                            <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Category Native Name" >
                                                                <DialogContent>
                                                                    <CategoryNativeForm categoryId={nativenames} languages={languages} closeModal={closeModal} requestType="Create" />
                                                                </DialogContent>
                                                            </FormDialog>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-8">
                                                    <div class="card">
                                                        <h5 class="card-header">{nativenames?.name}</h5>
                                                        {/* <div class="card-body">
                                                    <h5 class="card-title">{categorynativenames.name}</h5>
                                                </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-lg-12">
                                            {nativenames?.categorynativenames?.length > 0 ?
                                                <Table tableHeader={header} title="Recent Category Native Names">
                                                    {nativenames?.categorynativenames?.map((value, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{value?.name}</td>
                                                            <td>{value?.language.name}</td>
                                                            <td>
                                                                {user && (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                                                    <ul class="list-inline mb-0">


                                                                        <li class="list-inline-item">
                                                                            <a class="icon circle-icon " data-tip data-for="edit" onClick={() => openModalEdit(value?.id)}><i class="mdi mdi-circle-edit-outline  text-primary"></i></a>
                                                                            <ReactTooltip id='edit' place="top" effect="solid">
                                                                                Edit
                                                                            </ReactTooltip>
                                                                        </li>
                                                                        <li class="list-inline-item">
                                                                            <a class="icon circle-icon" data-tip data-for="delete" onClick={() => dispatch(deleteCategoryNativeName(value?.id))}><i class="mdi mdi-delete text-danger"></i></a>
                                                                            <ReactTooltip id='delete' place="top" effect="solid">
                                                                                Delete
                                                                            </ReactTooltip>
                                                                        </li>
                                                                    </ul>
                                                                    :
                                                                    <ul class="list-inline mb-0">


                                                                        <li class="list-inline-item">
                                                                            <a class="icon circle-icon "><i class="mdi mdi-circle-edit-outline "></i></a>
                                                                            <ReactTooltip place="top" effect="solid">
                                                                                Edit
                                                                            </ReactTooltip>
                                                                        </li>
                                                                        <li class="list-inline-item">
                                                                            <a class="icon circle-icon" ><i class="mdi mdi-delete"></i></a>
                                                                            <ReactTooltip place="top" effect="solid">
                                                                                Delete
                                                                            </ReactTooltip>
                                                                        </li>
                                                                    </ul>
                                                                }

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </Table>
                                                : <h4>There are no categories</h4>}
                                            <FormDialog clickClose={closeModalEdit} clickOpen={() => openModalEdit(value?.id)} open={openEdit} openBtnClass="dropdown-item" icon={<i class="fa fa-edit mr-2"></i>} action="Edit Category" >
                                                <DialogContent>
                                                    <CategoryNativeForm categoryId={nativenames} languages={languages} closeModal={closeModalEdit} categorynativedata={selectedElement} requestType="Edit" />
                                                </DialogContent>
                                            </FormDialog>
                                        </div>
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

export default withAuth(CategoryNativeName);