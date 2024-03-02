// component
import Iconify from "../../components/Iconify";
import * as React from "react";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
    // {
    //     title: 'blogs',
    //     path: '/blogs',
    //     icon: getIcon('iconoir:page'),
    //     roles: "Blog.view"
    // },
    {
        title: "users",
        path: "/users",
        icon: getIcon("eva:people-fill"),
        roles: "User.view"
    },
    {
        title: 'faqs',
        path: "/faqs",
        icon: getIcon('wpf:faq'),
        roles: 'Faq.view',
    },
    // {
    //     title: 'services',
    //     path: "/services",
    //     icon: getIcon('material-symbols:home-repair-service-rounded'),
    //     roles: 'Service.view',
    // },
];

export default navConfig;
