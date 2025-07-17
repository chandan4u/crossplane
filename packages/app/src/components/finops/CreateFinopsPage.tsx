import React, { useState } from 'react';
import { Content, Page } from '@backstage/core-components';
import { CustomHeader } from '../CustomHeader';
import { Box, TextField, MenuItem, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const departments = ['Finance', 'IT', 'Operations', 'Engineering'];
const statuses = ['Active', 'Inactive'];

interface FinopsForm {
  fin_code: string;
  name: string;
  department: string;
  description: string;
  status: string;
}

const initialForm: FinopsForm = {
  fin_code: '',
  name: '',
  department: '',
  description: '',
  status: '',
};

export const CreateFinopsPage = () => {
  const [form, setForm] = useState<FinopsForm>(initialForm);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as keyof FinopsForm;
    setForm({ ...form, [name]: e.target.value as string });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual onboarding logic here
    alert('FinOps group onboarded!');
    navigate('/finops');
  };

  return (
    <Page themeId="home">
      <CustomHeader />
      <Content>
        <Typography variant="h5" mb={3}>Create FinOps Group</Typography>
        <Box component="form" onSubmit={handleSubmit} maxWidth={520} mx="auto" display="flex" flexDirection="column" gap={3}>
          <TextField
            label="FinOps Code"
            name="fin_code"
            value={form.fin_code}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            select
            label="Department"
            name="department"
            value={form.department}
            onChange={handleSelectChange}
            required
            fullWidth
          >
            {departments.map(dep => (
              <MenuItem key={dep} value={dep}>{dep}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            minRows={2}
            fullWidth
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleSelectChange}
            required
            fullWidth
          >
            {statuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="secondary" onClick={() => navigate('/finops')}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">Onboard</Button>
          </Stack>
        </Box>
      </Content>
    </Page>
  );
};
