import Head from 'next/head';
import ProverbTable from '../../components/UIElements/Table';
import StatCard from '../../components/widgets/StatCard';
import withAuth from '@/utils/withAuth';

const tableHeader = [
  { id: 1, title: 'CreatedBy' },
  { id: 2, title: 'Title' },
  { id: 3, title: 'Created At' },
  { id: 4, title: 'Status' },
  { id: 5, title: 'Verified By' },
  { id: 6, title: 'Actions' },
];

const tableContent = [
  {
    id: 1,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'pending',
    verifyBy: 'Johnson',
    action: '...',
  },
  {
    id: 2,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'rejection',
    verifyBy: 'Johnson',
    action: '...',
  },
  {
    id: 3,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'accepted',
    verifyBy: 'Johnson',
    action: '...',
  },
  {
    id: 4,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'rejection',
    verifyBy: 'Johnson',
    action: '...',
  },
  {
    id: 5,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'accepted',
    verifyBy: 'Johnson',
    action: '...',
  },
  {
    id: 6,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'rejection',
    verifyBy: 'Johnson',
    action: '...',
  },
  {
    id: 7,
    creator: 'Kolade Atols',
    title: 'Adminto Admin V1',
    createdAt: '01/01/2017',
    status: 'pending',
    verifyBy: 'Johnson',
    action: '...',
  },
];

const Dashboard = () => {
  return (
    <div class="content">
      <div class="container-fluid">

        <div class="row">
          <div class="col-xl-3 col-md-6">
            <StatCard
              name="Proverbs"
              icon={<i class="mdi mdi-domain mdi-48px text-warning"></i>}
              value={1800}
              color="text-warning"
            />
          </div>
          <div class="col-xl-3 col-md-6">
            <StatCard
              name="Users"
              icon={
                <i class="mdi mdi-account-multiple-outline mdi-48px text-success"></i>
              }
              value={500}
              color="text-success"
            />
          </div>
          <div class="col-xl-3 col-md-6">
            <StatCard
              name="Categories"
              icon={
                <i class="mdi mdi-clipboard-list-outline mdi-48px text-primary"></i>
              }
              value={100}
              color="text-primary"
            />
          </div>
          <div class="col-xl-3 col-md-6">
            <StatCard
              name="Family"
              icon={<i class="mdi mdi-file-tree mdi-48px text-danger"></i>}
              value={2000}
              color="text-danger"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12">
            <ProverbTable title='All Proverbs' tableHeader={tableHeader}>
              {tableContent.map((value) => (
                <tr key={value.id}>
                  <td>{value.creator}</td>
                  <td>{value.title}</td>
                  <td>{value.createdAt}</td>
                  <td>
                    <span class={value.status === 'rejection'? "badge badge-danger" : value.status === 'accepted' ? "badge badge-success" : "badge badge-warning"}>{value.status}</span>
                  </td>
                  <td>{value.verifyBy}</td>
                  <td>...</td>
                </tr>
              ))}
            </ProverbTable>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
