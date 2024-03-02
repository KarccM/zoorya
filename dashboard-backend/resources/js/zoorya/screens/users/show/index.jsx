import * as React from 'react';
import { Tabs, Tab, Typography, Box, Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Iconify from '../../../components/Iconify';
import Page from '@/components/Page';
import Details from './details'
import UserSessions from './sessions';
import UserCourses from './courses';
import useRoles from '@/hooks/useRoles';

const Show = () => {
    const [tab, setTab] = React.useState(0);
    const { userCan } = useRoles();
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
        userCan("SHOW_COURSE") && {
            tab: {
                message: 'courses',
                icon: 'mdi:bookshelf'
            },
            tabPanel: {
                component: <UserCourses />
            }
        },
        userCan("SHOW_SESSION") && {
            tab: {
                message: 'schedule_sessions',
                icon: 'fa-solid:book'
            },
            tabPanel: {
                component: <UserSessions />
            }
        },
    ].filter(comp => comp)

    return (
        <Page title="Show User">
            <Container>
                <Typography variant='h3'>
                    <FormattedMessage id="user_account" />
                </Typography>
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

export default Show;


