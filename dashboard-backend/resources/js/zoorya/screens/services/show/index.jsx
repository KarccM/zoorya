import * as React from 'react';
import { Tabs, Tab, Typography, Box, Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Page from '@/components/Page';
import Details from './tabs/details';
import Icons from './tabs/icons';
import useRoles from '@/hooks/useRoles';
import Iconify from '@/components/Iconify';
import Breadcrumbs from '@/components/breadcrumbs';

export default function ShowService() {
  const { userCan } = useRoles();
  const [tab, setTab] = React.useState(0);
  const handleChange = (event, selectedTab) => {
    setTab(selectedTab);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}

      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'} >{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  let components = [
    {
      tab: {
        message: 'details',
        icon: 'mdi:card-account-details'
      },
      tabPanel: {
        component: <Details />
      }
    },
    userCan("SHOW_OUR_SERVICE_ICON") && {
      tab: {
        message: 'icon',
        icon: 'raphael:icons'
      },
      tabPanel: {
        component: <Icons />
      }
    },
  ].filter(comp => comp)

  return (
    <Page title="Show Blog">
      <Container>
        <Breadcrumbs />
        <Box>
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
            {components.map(({ tab }) => (
              <Tab key={tab.message} label={
                <Box>
                  <Iconify icon={tab.icon} sx={{ mr: 1 }} />
                  <FormattedMessage id={tab.message} />
                </Box>
              } {...a11yProps(0)}
              />)
            )}
          </Tabs>
        </Box>
        {components.map(({ tabPanel }, idx) => <TabPanel key={idx} component='div' value={tab} index={idx}>{tabPanel.component}</TabPanel>)}
      </Container>
    </Page>
  );
}


