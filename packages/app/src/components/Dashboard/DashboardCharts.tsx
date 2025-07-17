import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Active', value: 8 },
  { name: 'Inactive', value: 2 },
];
const COLORS = ['#1976d2', '#bdbdbd'];

const barData = [
  { name: 'BU001', projects: 4 },
  { name: 'BU002', projects: 2 },
  { name: 'BU003', projects: 6 },
];

export const DashboardCharts = () => (
  <Grid container spacing={3} style={{ marginTop: 16 }}>
    <Grid item xs={12} sm={4}>
      <Paper elevation={3} style={{ padding: 24, textAlign: 'center' }}>
        <Typography variant="h6">Total Business Units</Typography>
        <Typography variant="h3" color="primary">10</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Paper elevation={3} style={{ padding: 24, textAlign: 'center' }}>
        <Typography variant="h6">Total Projects</Typography>
        <Typography variant="h3" color="primary">22</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Paper elevation={3} style={{ padding: 24, textAlign: 'center' }}>
        <Typography variant="h6">Active Users</Typography>
        <Typography variant="h3" color="primary">134</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper elevation={3} style={{ padding: 24, height: 340 }}>
        <Typography variant="h6" gutterBottom>Status Distribution</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper elevation={3} style={{ padding: 24, height: 340 }}>
        <Typography variant="h6" gutterBottom>Projects per BU</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="projects" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  </Grid>
);
