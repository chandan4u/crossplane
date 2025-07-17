import React, { useState } from 'react';
import { Content, Page, ContentHeader } from '@backstage/core-components';
import { CustomHeader } from '../CustomHeader';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl, Stepper, Step, StepLabel, Button, Box as MuiBox, Typography, Stack } from '@mui/material';

interface Application {
  code: string;
  name: string;
  project: string;
  lbu: string;
  owner: string;
  status: string;
}

const initialForm: Application = { code: '', name: '', project: '', lbu: '', owner: '', status: 'Active' };

const steps = [
  'Basic Info',
  'Project Details',
  'Owner & Status',
];

export function StepperBar({ activeStep }: { activeStep: number }) {
  return (
    <MuiBox width="100%" maxWidth="800px">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </MuiBox>
  );
}

function StepperForm({ form, setForm, onSubmit, onCancel, activeStep, setActiveStep }: any) {
  const handleNext = () => setActiveStep((s: number) => s + 1);
  const handleBack = () => setActiveStep((s: number) => s - 1);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, [name as string]: value }));
  };

  const handleSelect = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, [name as string]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      {/* No stepper here; it's rendered at the top via StepperBar */}
      {activeStep === 0 && (
        <Stack spacing={2}>
            <TextField label="Code" name="code" value={form.code} onChange={handleInput} fullWidth required />
            <TextField label="Name" name="name" value={form.name} onChange={handleInput} fullWidth required />
        </Stack>
      )}
      {activeStep === 1 && (
        <Stack spacing={2}>
            <TextField label="Project" name="project" value={form.project} onChange={handleInput} fullWidth required />
            <TextField label="LBU" name="lbu" value={form.lbu} onChange={handleInput} fullWidth required />
        </Stack>
      )}
      {activeStep === 2 && (
        <Stack spacing={2}>
          <TextField label="Owner" name="owner" value={form.owner} onChange={handleInput} fullWidth required />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
                name="status"
                value={form.status}
                label="Status"
                onChange={handleSelect}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
        </Stack>
      )}
      <MuiBox mt={3} display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        )}
        <Button onClick={onCancel} variant="text" color="secondary">
          Cancel
        </Button>
      </MuiBox>
    </form>
  );
}

export const CreateApplicationPage = () => {
  const [form, setForm] = useState<Application>(initialForm);
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add application creation logic here
    alert('Application created!');
  };

  const handleCancel = () => {
    setForm(initialForm);
    // TODO: Add navigation logic here
  };

  return (
    <Page themeId="home">
      <CustomHeader />
      <Content>
      <h2>Create Application</h2>
      <p>This is the Project List Page. Implement your table or list here.</p>
        <MuiBox width="100%" py={4}>
          <MuiBox display="flex" justifyContent="center" alignItems="center" mb={4} mt={2}>
            <StepperBar activeStep={activeStep} />
          </MuiBox>
          <MuiBox display="flex" justifyContent="center" alignItems="flex-start" width="100%" mt={2}>
            <MuiBox width="100%" maxWidth="520px" px={{ xs: 2, sm: 4 }}>
              <StepperForm form={form} setForm={setForm} onSubmit={handleSubmit} onCancel={handleCancel} activeStep={activeStep} setActiveStep={setActiveStep} />
            </MuiBox>
          </MuiBox>
        </MuiBox>
      </Content>
    </Page>
  );
};
