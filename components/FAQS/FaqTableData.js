import React from 'react'
import OrderByDropdown from './DropDown';

const FaqTableData = ({ children, tableHeader, 
    title}) => {
  
    return (
        <div className='card-box col-lg-12 mx-auto'>
            <h4 class="mb-2 header-title">{title}</h4>
            <OrderByDropdown/>
            <div class="table-responsive">
                <table class="table table-striped table-bordered nowrap">
                    <thead>
                        <tr>
                            {tableHeader.map((value) => (
                                <th key={value.id}> {value.title} </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FaqTableData
