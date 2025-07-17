import React, { useState } from 'react';
import {
  Content,
  Page,
  HeaderLabel,
  Table,
  TableColumn,
  Button as BackstageButton,
} from '@backstage/core-components';
import { CustomHeader } from '../CustomHeader';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';

interface BusinessUnit {
  bu_code: string;
  name: string;
  description: string;
  status: string;
}

const initialData: BusinessUnit[] = [
  { bu_code: 'BU001', name: 'Finance', description: 'Finance Department', status: 'Active' },
  { bu_code: 'BU002', name: 'HR', description: 'Human Resources', status: 'Inactive' },
];

const columns: TableColumn[] = [
  { title: 'BU Code', field: 'bu_code' },
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' },
  { title: 'Status', field: 'status' },
];

export const BusinessUnitListPage = () => {
  const [data, setData] = useState<BusinessUnit[]>(initialData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BusinessUnit>({ bu_code: '', name: '', description: '', status: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ bu_code: '', name: '', description: '', status: '' });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof BusinessUnit;
    setForm({ ...form, [name]: event.target.value as string });
  };
  const handleSubmit = () => {
    setData([...data, form]);
    handleClose();
  };

  return (
    <Page themeId="home">
      <CustomHeader title="Business Units" subtitle="List of all business units">
        <HeaderLabel label="Owner" value="Company" />
      </CustomHeader>
      <CustomHeader />
      <Content>
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: 16 }}>
          Create Business Unit
        </Button>
        <Table
          title="Business Units"
          options={{ search: true, paging: false }}
          columns={columns}
          data={data}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Business Unit</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="bu_code"
              label="BU Code"
              fullWidth
              value={form.bu_code}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              fullWidth
              value={form.description}
              onChange={handleChange}
            />
            <Select
              margin="dense"
              name="status"
              label="Status"
              fullWidth
              value={form.status}
              onChange={handleSelectChange}
              displayEmpty
              style={{ marginTop: 16, marginBottom: 8 }}
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Content>
    </Page>
  );
};
