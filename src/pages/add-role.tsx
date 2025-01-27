import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreateRoleView } from 'src/sections/roleList/view';

// ----------------------------------------------------------------------

const Page = () => (
    <>
      <Helmet>
        <title> {`New Plan - ${CONFIG.appName}`}</title>
      </Helmet>

      <CreateRoleView />
    </>
  )

export default Page;