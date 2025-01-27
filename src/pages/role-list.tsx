import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RoleListView } from 'src/sections/roleList/view';

const Page = () => (
    <>
      <Helmet>
        <title> {`Roles List - ${CONFIG.appName}`}</title>
      </Helmet>

      <RoleListView />
    </>
  )

export default Page;