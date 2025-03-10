import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import withAuth from '@/utils/withAuth'
import { fetchCategories, createCategory, deleteCategory } from '../../store/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
// import FormDialog from '../../components/widgets/modal';
import CategoryForm from '../../parts/forms/categoryForm';
import DialogContent from '@material-ui/core/DialogContent';
// import Table from '../../components/UIElements/Table';
import FormDialog from '../../components/widgets/Modal';
import Alert from '../../components/UIElements/Alert';
import { convTime, checkPermission } from '../../utils/utilities'
import ReactTooltip from "react-tooltip";
import Table from '../../components/UIElements/DataTable'




const useStyles = makeStyles({
  detail: {
    borderTop: '4px solid green',
  },
  button: {
    margin: '10px',
  },
});

const Category = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState();
  const dispatch = useDispatch();
  const { categories, isLoadingcategories } = useSelector(state => state.Categories);
  const { isLoading, msg } = useSelector((state) => state.auth);
  const { user } = useSelector(state => state.auth);

  console.log(categories)
  const openModal = () => {
    setOpen(true);
  };

  const openModalEdit = (value) => {
    const editvalue = categories?.find((x) => x.id === value)
    console.log(editvalue)
    setSelectedElement(editvalue)
    setOpenEdit(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeModalEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [fetchCategories]);

  const header = [
    { id: 's/n', title: 'S/N' },
    {
      id: 'name',
      title: 'Name',
    },
    {
      id: 'date_created',
      title: 'Date Created',
    },
    // {
    //   id: 'date_modified',
    //   title: 'Date Modified',
    // },
    {
      id: 'action',
      title: 'Action',
    },
  ];

  return (
    <div class="content">
      {isLoadingcategories && (categories && categories.length > 0) ? <div class="spinner">Loading...</div>

        :
        <>
          {msg ? <Alert payload={msg} /> : null}
          <div class="container-fluid">
            {/* <div class="row"> */}
            <div class="col-lg-12">
              <div class="card-box">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="widget">
                      <div class="widget-body">
                        {/* <a href="#" onClick={openModal} class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light">
                                            <i class="fa fa-plus mr-1"></i> Add Category
                                        </a> */}
                        {/* {(user.role == 'Admin') | (user.role == 'Publisher') | (user.role == 'SuperAdmin') | (user.role == 'Author') ?  */}
                        {user && (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                          <a href="#" onClick={() => openModal()} class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light">
                            <i class="fa fa-plus mr-1"></i> Add Category
                          </a>
                          : <a href="#" class="btn btn-lg btn-secondary  font-16 btn-block waves-effect waves-light">
                            <i class="fa fa-plus mr-1"></i> Add Category
                          </a>}

                        <FormDialog clickClose={closeModal} clickOpen={openModal} open={open} action="Add Category" >
                          <DialogContent>
                            <CategoryForm closeModal={closeModal} requestType="Create" />
                          </DialogContent>
                        </FormDialog>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <Table tableHeader={header} id="datatable-buttons" title="Recent Categories">
                      {categories && categories.map((value, index) => {
                        return (
                          <tr key={value}>
                            <td>{index + 1}</td>
                            <td>{value.name}</td>
                            <td>{convTime(value.date_created)}</td>
                            {/* <td>{convTime(value.date_modified)}</td> */}
                            <td>
                              <ul class="list-inline mb-0">

                                <li class="list-inline-item">
                                  <Link href="categories/[id]" as={`categories/${value.slug}`}>
                                    <a class="icon circle-icon " data-tip data-for="language"><i class="fa fa-language "></i></a>
                                  </Link>
                                  <ReactTooltip id='language' place="top" effect="solid">
                                    Category Native Language
                                  </ReactTooltip>
                                </li>
                                {/* {(user.role == 'Admin') | (user.role == 'Publisher') | (user.role == 'SuperAdmin') | (user.role == 'Author') ? */}
                                {user && (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                  <>
                                    <li class="list-inline-item">
                                      <a class="icon circle-icon " data-tip data-for="edit" onClick={() => openModalEdit(value.id)}><i class="mdi mdi-circle-edit-outline  text-primary"></i></a>
                                      <ReactTooltip id='edit' place="top" effect="solid">
                                        Edit Category
                                      </ReactTooltip>
                                    </li>
                                    <li class="list-inline-item">
                                      <a class="icon circle-icon" data-tip data-for="delete" onClick={() => dispatch(deleteCategory(value.id))}><i class="mdi mdi-delete text-danger"></i></a>
                                      <ReactTooltip id='delete' place="top" effect="solid">
                                        Delete Category
                                      </ReactTooltip>
                                    </li>
                                  </>
                                  : <>
                                    <li class="list-inline-item">
                                      <a class="icon circle-icon " ><i class="mdi mdi-circle-edit-outline"></i></a>
                                      <ReactTooltip place="top" effect="solid">
                                        Edit Category
                                      </ReactTooltip>
                                    </li>
                                    <li class="list-inline-item">
                                      <a class="icon circle-icon" ><i class="mdi mdi-delete"></i></a>
                                      <ReactTooltip  place="top" effect="solid">
                                        Delete Category
                                      </ReactTooltip>
                                    </li>
                                  </>}
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
                        <CategoryForm closeModal={closeModalEdit} categorydata={selectedElement} requestType="Edit" />
                      </DialogContent>
                    </FormDialog>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}

          </div>
        </>}
    </div>
  );
};

export default withAuth(Category);