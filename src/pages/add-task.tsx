import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CreateTaskView } from 'src/sections/taskList/view';

// ----------------------------------------------------------------------

const Page = () => (
    <>
      <Helmet>
        <title> {`New Plan - ${CONFIG.appName}`}</title>
      </Helmet>

      <CreateTaskView />
    </>
  )

export default Page;