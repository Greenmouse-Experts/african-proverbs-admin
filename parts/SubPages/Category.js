import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { MultiSelectComponent } from '../../components/UIElements/InputField'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../../store/actions/categoryAction'
import { formatCategoryOptions, retrieveCategoryArray, retrieveIDs, checkPermission } from '../../utils/utilities'
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles'
import { updateProverbCategory } from "@/store/actions/proverbActions";
import Categories from "@/store/reducers/categoriesReducers";
import { toggleIsLoading } from '@/store/actions/authActions';


const ProverbCategory = ({ proverb, user }) => {
    const classes = useStyles()
    const { categories } = useSelector(state => state.Categories)
    const { isLoading } = useSelector(state => state.proverb)
    const dispatch = useDispatch();

    const { handleSubmit, control, reset, register, errors } = useForm();

    const initialOption = [
        { label: "Choose a category", value: " ", disabled: true },

    ];

    useEffect(() => {
        if (categories == null) {
            dispatch(fetchCategories())
        }
    }, [])

    const onSubmit = (data) => {
        const { category } = data
        console.log("Updating category");
        const selectedCategory = category.map(cat => {
            return categories.find(
                (option) => option.id === parseInt(cat.value)
            )
        })

        const payload = {
            categories: retrieveCategoryArray(category),
            content: proverb.content,
            status: proverb.status,
            ethnic: proverb.ethnic.id
        }
        console.log(payload);
        dispatch(updateProverbCategory(payload, proverb.id, selectedCategory))
    }

    const setRemoveID = (e, data) => {
        console.log("Updating category");

        document.getElementById(`checkbox${data.id}`).checked = false;

        const newCategories = proverb.categories.filter(
        (x) => parseInt(x.id) !== parseInt(data.id));
        console.log(newCategories);
        const payload = {
            categories: retrieveIDs(newCategories),
            content: proverb.content,
            status: proverb.status,
            ethnic: proverb.ethnic.id
        }
        dispatch(updateProverbCategory(payload, proverb.id))
    }

    return (
        <div class="row">
            <div class="col-12">
                <div class="card-box">
                    <div class="row">
                        {
                            // user && user.role == 'Author' | user.role == 'Admin' | user.role == 'SuperAdmin' ?
                            user && ((checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'Publisher')) | (checkPermission(user.roles, 'SuperAdmin'))) ?
                                <div class="col-md-6">
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                        <div class="form-group col-md-12">
                                            <h4 class="mt-0 header-title">Proverb Category</h4>
                                            <p class="text-muted font-14">
                                                Kindly Update The Proverb Categories by filling the form below
                                    </p>

                                            <label for="inputState" class="col-form-label">Category</label>
                                            <Controller
                                                control={control}
                                                name="category"
                                                defaultValue={formatCategoryOptions(proverb.categories)}
                                                rules={{
                                                    validate: value => value.length > 0 || "A proverb Must Belong to One or More Category",
                                                    required: true
                                                }}

                                                render={({ onChange, onBlur, value }) => (
                                                    <MultiSelectComponent
                                                        options={categories ? formatCategoryOptions(categories) : initialOption}
                                                        value={value || ''}
                                                        onChange={(category, delta, source, editor) => onChange(category)}
                                                        labelledBy={"Select"}
                                                        name='category'
                                                        ref={register({ required: true })}
                                                    />
                                                )}
                                            />
                                            {errors.category && <span className={classes.error}>{errors.category.message}</span>}

                                        </div>

                                        <div class="form-group col-md-12">
                                            <button type='submit' disabled={isLoading ? true : false} class="btn btn-purple waves-effect waves-light"> <span>Update Category</span> <i class="mdi mdi-server ml-1"></i> </button>
                                        </div>

                                    </form>
                                </div>
                                :null
                        }


                        <div class="col-md-6">
                            <h4 class="header-title">Current Proverb Categories</h4>
                            <div class="mt-3">
                                <form role="form">
                                {
                                    proverb ?
                                        proverb.categories.map(cat => (
                                            
                                                <div class="form-group">
                                                    <div class="checkbox">
                                                    { user && (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'Publisher'))  | (checkPermission(user.roles, 'Reviewer')) | (checkPermission(user.roles, 'SuperAdmin')) ?
                                                        <input onChange={(e)=> setRemoveID(e, cat) } id={`checkbox${cat.id}`} type="checkbox" checked/> : null }
                                                        <label class="custom-control-label" for={`checkbox${cat.id}`}>
                                                            {cat.name}
                                                        </label>
                                                    </div>
                                                </div>
                                            

                                            // <div key={cat.id} class="custom-control custom-checkbox">
                                            //     <input onClick={(e)=> setRemoveID(e, cat) } type="checkbox" id={cat.id} class="custom-control-input" checked id="customCheck2" />
                                            //     <label class="custom-control-label" for="customCheck1">{cat.name} </label>
                                            // </div>
                                        ))
                                        :
                                        null
                                }
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    error: {
        color: 'red',
        fontSize: 11
    }
}));

export default ProverbCategory