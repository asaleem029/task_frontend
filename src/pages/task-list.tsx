import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TaskListView } from 'src/sections/taskList/view';

const Page = () => (
    <>
      <Helmet>
        <title> {`Tasks List - ${CONFIG.appName}`}</title>
      </Helmet>

      <TaskListView />
    </>
  )

export default Page;