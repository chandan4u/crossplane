import React, { useState } from 'react';
import {
  Content,
  Page,
  HeaderLabel,
  Table,
  TableColumn,
  TableProps,
  InfoCard,
  Button as BackstageButton,
} from '@backstage/core-components';
import { CustomHeader } from '../CustomHeader';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

interface Application {
  code: string;
  name: string;
  project: string;
  lbu: string;
  owner: string;
  status: string;
}

const initialApplications: Application[] = [
  { code: 'APP001', name: 'App One', project: 'Project Alpha', lbu: 'LBU1', owner: 'Owner1', status: 'Active' },
  { code: 'APP002', name: 'App Two', project: 'Project Beta', lbu: 'LBU2', owner: 'Owner2', status: 'Inactive' },
];

const columns: TableColumn<Application>[] = [
  { title: 'Code', field: 'code' },
  { title: 'Name', field: 'name' },
  { title: 'Project', field: 'project' },
  { title: 'LBU', field: 'lbu' },
  { title: 'Owner', field: 'owner' },
  { title: 'Status', field: 'status' },
];


export const ApplicationListPage = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const navigate = useNavigate();

  return (
    <Page themeId="home">
      <CustomHeader />
      <Content>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Applications</Typography>
          <BackstageButton
            variant="contained"
            color="primary"
            to="/applications/create"
            component={require('react-router-dom').Link}
          >
            Create Application
          </BackstageButton>
        </Box>
        <Table
          title=""
          options={{ search: true, paging: false }}
          columns={columns}
          data={applications}
        />
      </Content>
    </Page>
  );
};
