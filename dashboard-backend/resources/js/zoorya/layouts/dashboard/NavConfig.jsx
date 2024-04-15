// component
import Iconify from "../../components/Iconify";
import * as React from "react";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
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
    {
        title: 'services',
        path: "/services",
        icon: getIcon('material-symbols:home-repair-service-rounded'),
        roles: 'Service.view',
    },
    {
        title: 'sliders',
        path: "/sliders",
        icon: getIcon('solar:slider-minimalistic-horizontal-line-duotone'),
        roles: 'Slider.view',
    },
    {
        title: 'categories',
        path: "/categories",
        icon: getIcon('bxs:category'),
        roles: 'Category.view',
    }
];

export default navConfig;
