import PropTypes from 'prop-types';

const Table = ({children, tableHeader, title, disablepagination}) => {
  return (
    <div class="card-box">
      <div class="dropdown float-right">
        <a
          href="#"
          class="dropdown-toggle arrow-none card-drop"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="mdi mdi-dots-vertical"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="javascript:void(0);" class="dropdown-item">
            View All
          </a>
        </div>
      </div>

      {/* <h4 class="header-title mt-0 mb-3">Latest Projects</h4> */}
      <h4 class="header-title mt-0 mb-3">{title}</h4>
      <div class="table-responsive">
        <table class={`table table-hover mb-0 ${disablepagination && 'diablepagination'}`}>
          <thead>
            <tr>
              {tableHeader.map((value) => (
                <th key={value.id}> {value.title} </th>
              ))}
            </tr>
          </thead>
          <tbody>
              {children}
              {/* the below are the code to set up for table children and twist to your taste */}

              {/*  check dashboard table to see how it been structured */}


            {/* {tableContent.map((value) => (
              <tr key={value.id}>
                <td>{value.creator}</td>
                <td>{value.title}</td>
                <td>{value.createdAt}</td>
                <td>
                  <span class="badge badge-danger">Rejected</span>
                </td>
                <td>{value.verifyBy}</td>
                <td>...</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
    tableHeader: PropTypes.object.isRequired
};

export default Table;
