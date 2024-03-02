import Breadcrumbs from '@/components/breadcrumbs'
import Page from '@/components/Page'
import { Box, Tab, Tabs, Typography, Container } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import ChangePassword from './partials/change-password'
import ProfileForm from './partials/profile-form'
import PropTypes from 'prop-types'

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export default function Profile() {
  const [value, setValue] = React.useState(1)

  const handleChange = (event, newValue) => setValue(newValue)

  return (
    <Page title="User | Profile">
      <Container>
        <Box>
          <Typography variant="h4">
            <FormattedMessage id="profile" />
          </Typography>

          <Breadcrumbs />

          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ marginBottom: '10px' }}>
            <Tab label={<FormattedMessage id="general" />} {...a11yProps(0)} />
            <Tab label={<FormattedMessage id="change_password" />} {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <ProfileForm />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ChangePassword />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  )
}
