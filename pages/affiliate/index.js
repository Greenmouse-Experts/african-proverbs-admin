import Unauthorized from '@/parts/SubPages/Unauthorized';
import { checkPermission } from '@/utils/utilities';
import withAuth from '@/utils/withAuth';
import { useSelector } from 'react-redux';
import AffiliateTable from './AffiliateTable';

const Affiliate = () => {

    const { user } = useSelector(state => state.auth);

    return (
        <div class="content">
            <h1 class="header-title display-1">Manage Affiliated Language</h1>
            <div class="container-fluid ms-auto ">
                <div class="row">
                    <div class="col-md-11 card py-4" style={{ margin: "auto" }}>
                        {user && (checkPermission(user.roles, 'Admin')) | (checkPermission(user.roles, 'Author')) | (checkPermission(user.roles, 'SuperAdmin')) ?

                            <AffiliateTable />
                            :
                            <Unauthorized />}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withAuth(Affiliate)