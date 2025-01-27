import { Helmet } from 'react-helmet-async';

import { Container } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';
// ----------------------------------------------------------------------

const Page = () => (
  <Container
      maxWidth="lg"
      sx={{
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
      </Helmet>

      <OverviewAnalyticsView />
    </Container>
);

export default Page;
