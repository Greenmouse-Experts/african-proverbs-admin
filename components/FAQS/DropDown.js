import { orderFaq } from '@/store/actions/faqActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function OrderByDropdown() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch()


  useEffect(() => {
    if (selectedValue) dispatch(orderFaq(selectedValue))
  }, [selectedValue])

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };




  return (
    <div class="input-group my-3  d-flex">
      <label class="input-group-text" for="inputGroupSelect01">Order Faqs by</label>
      <select class="form-select" id="inputGroupSelect01" onChange={handleChange} value={selectedValue}>
        <option selected>Choose...</option>
        <option value="reset">Reset</option>
        <option value="alphabet">Alphabetically</option>
        <option value="created">Date Created</option>
        <option value="modified">Date Modified</option>
      </select>
    </div>
  );
}

export default OrderByDropdown;