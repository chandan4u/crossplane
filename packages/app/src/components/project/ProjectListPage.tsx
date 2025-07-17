import React, { useState } from 'react';
import { Content, Page, HeaderLabel } from '@backstage/core-components';
import { CustomHeader } from '../CustomHeader';

export const ProjectListPage = () => {
  return (
    <Page themeId="home">
      <CustomHeader />
      <Content>
        <h2>Projects</h2>
        <p>This is the Project List Page. Implement your table or list here.</p>
      </Content>
    </Page>
  );
};
