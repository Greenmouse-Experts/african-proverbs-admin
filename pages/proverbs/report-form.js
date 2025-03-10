import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import withAuth from '@/utils/withAuth'
import MultiSelect from "react-multi-select-component";
import React, {useState} from 'react'
import Link from 'next/link';


const Filter = () => {
    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
        { label: "Watermelon 🍉", value: "watermelon" },
        { label: "Pear 🍐", value: "pear" },
        { label: "Apple 🍎", value: "apple" },
        { label: "Tangerine 🍊", value: "tangerine" },
        { label: "Pineapple 🍍", value: "pineapple" },
        { label: "Peach 🍑", value: "peach" },
      ];
    const [selected, setSelected] = useState([]);
    const [text, setText] = useState('')
    const handleChange = (value) => {
        setText(value)
    }
    return (
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="header-title">Filter Proverbs</h4>
                                <p class="sub-header">Kindly Fill All Fields Correctly</p>
                                <form noValidate autoComplete="off">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputState" class="col-form-label">Ethnic</label>
                                            <select id="inputState" class="form-control">
                                                <option>All</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputState" class="col-form-label">Category</label>
                                            <MultiSelect
                                                options={options}
                                                value={selected}
                                                onChange={setSelected}
                                                labelledBy={"Select"}
                                            />   
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label for="inputState" class="col-form-label">User</label>
                                            <select id="inputState" class="form-control">
                                                <option>All</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                        <label for="inputState" class="col-form-label">Date</label>                                             
                                            <input type="date" class="form-control" data-toggle="input-mask" data-mask-format="00/00/0000"/>
                                        </div>
                                    
                                        <div class="form-group col-md-12">
                                            <Link href='/proverbs/report'>
                                                <button class="btn btn-purple waves-effect waves-light"> <span>Filter Proverbs </span> <i class="fa fa-globe-africa ml-1"></i> </button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withAuth(Filter);