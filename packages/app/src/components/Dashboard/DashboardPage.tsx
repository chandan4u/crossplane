import React from 'react';
import { CustomHeader } from '../CustomHeader';
import { DashboardCharts } from './DashboardCharts';
import { Page, HeaderLabel, Content } from '@backstage/core-components';

export const DashboardPage = () => (
  <Page themeId="home">
    <CustomHeader />
    <Content>
      <DashboardCharts />
    </Content>
  </Page>
);
