import * as React from 'react';
import { useState } from 'react';
import {
  Content,
  Page,
  Table,
  TableColumn,
  Button as BackstageButton,
} from '@backstage/core-components';
import { CustomHeader } from '../CustomHeader';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Finops {
  fin_code: string;
  name: string;
  department: string;
  description: string;
  status: string;
}

const initialFinops: Finops[] = [
  { fin_code: 'FIN001', name: 'FinOps Alpha', department: 'Finance', description: 'Cloud cost management', status: 'Active' },
  { fin_code: 'FIN002', name: 'FinOps Beta', department: 'IT', description: 'Resource optimization', status: 'Inactive' },
];

const columns: TableColumn<Finops>[] = [
  { title: 'FinOps Code', field: 'fin_code' },
  { title: 'Name', field: 'name' },
  { title: 'Department', field: 'department' },
  { title: 'Description', field: 'description' },
  { title: 'Status', field: 'status' },
];

export const FinopsListPage = () => {
  const [finops, setFinops] = useState<Finops[]>(initialFinops);
  const navigate = useNavigate();

  return (
    <Page themeId="home">
      <CustomHeader />
      <Content>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">FinOps Groups</Typography>
          <BackstageButton
            variant="contained"
            color="primary"
            to="/finops/create"
            component={require('react-router-dom').Link}
          >
            Create FinOps Group
          </BackstageButton>
        </Box>
        <Table
          title="FinOps Groups"
          options={{ search: true, paging: false }}
          columns={columns}
          data={finops}
        />
      </Content>
    </Page>
  );
};
