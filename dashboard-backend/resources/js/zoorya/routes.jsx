import * as React from "react";
import { Link, Navigate, createBrowserRouter, useParams } from "react-router-dom";
import { FullPageErrorFallback } from "@/components/lib";
import { defaultLang, supportedLanguages } from "./constants";

import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import NotFound from "./screens/Page404";

// ----------------------------------------------------------------------
const checkLangBeforeLoading = ({ params }) => {
    const lang = params?.lang ?? defaultLang;
    const isSupported = supportedLanguages.includes(lang);
    if (!isSupported) {
        const currLangRout = `/${lang}`;
        const ReplacedRout = `/${defaultLang}`;
        window.location.replace(
            window.location.pathname.replace(currLangRout, ReplacedRout)
        );
    }
    return isSupported;
};
const useRouter = () => {
    return createBrowserRouter(
        [
            {
                path: "/",
                element: <LogoOnlyLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={`${defaultLang}/`} replace />,
                    },
                    {
                        path: "/404", element: <NotFound />
                    },
                    {
                        path: "*",
                        element: <Navigate to="404" replace />,
                    },
                ],
            },
            {
                path: "/:lang",
                lazy: async () => {
                    let dashboard = await import('./layouts/dashboard')
                    return { Component: dashboard.default };
                },
                errorElement: <FullPageErrorFallback />,
                loader: checkLangBeforeLoading,
                handle: {
                    crumb: () => <Link to="/">dashboard</Link>,
                },
                children: [
                    { index: true, element: <Navigate to={'users'} replace /> },
                    {
                        path: "users",
                        handle: {
                            crumb: () => <Link to="/users">users</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let Users = await import('./screens/users')
                                    return { Component: Users.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let AddUsers = await import('./screens/users/add')
                                    return { Component: AddUsers.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_user</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let EditUsers = await import('./screens/users/edit')
                                    return { Component: EditUsers.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_user</Link>
                                    ),
                                },
                            },
                            {
                                path: ':id',
                                lazy: async () => {
                                    let ShowUsers = await import('./screens/users/show')
                                    return { Component: ShowUsers.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id">user_details</Link>
                                    ),
                                },
                            },
                        ],
                    },
                    {
                        path: 'roles',
                        handle: {
                            crumb: () => <Link to="/roles">roles</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let roles = await import('./screens/roles')
                                    return { Component: roles.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let addRoles = await import('./screens/roles/Add')
                                    return { Component: addRoles.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_role</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let editRoles = await import('./screens/roles/Edit')
                                    return { Component: editRoles.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_role</Link>
                                    ),
                                },
                            },
                        ],
                    },
                    {
                        path: "countries",
                        handle: {
                            crumb: () => <Link to="/countries">countries</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let courses = await import('./screens/countries')
                                    return { Component: courses.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let courses = await import('./screens/countries/Add')
                                    return { Component: courses.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_country</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let courses = await import('./screens/countries/Edit')
                                    return { Component: courses.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_country</Link>
                                    ),
                                },
                            },
                        ],
                    },
                    {
                        path: 'profile',
                        index: true,
                        lazy: async () => {
                            let profile = await import('./screens/profile')
                            return { Component: profile.default };
                        },
                        handle: {
                            crumb: () => <Link to="/profile">profile</Link>,
                        },
                    },
                    {
                        path: "faqs",
                        handle: {
                            crumb: () => <Link to="/faqs">faqs</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let faq = await import('./screens/faqs')
                                    return { Component: faq.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let faq = await import('./screens/faqs/add')
                                    return { Component: faq.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_faq</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let faq = await import('./screens/faqs/edit')
                                    return { Component: faq.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_faq</Link>
                                    ),
                                },
                            },
                        ],
                    },
                    {
                        path: "our-services",
                        handle: {
                            crumb: () => <Link to="/our-services">services</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let service = await import('./screens/services')
                                    return { Component: service.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let service = await import('./screens/services/add')
                                    return { Component: service.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_service</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let service = await import('./screens/services/edit')
                                    return { Component: service.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_service</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id",
                                lazy: async () => {
                                    let service = await import('./screens/services/show')
                                    return { Component: service.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">show_service</Link>
                                    ),
                                },
                            },
                        ],
                    },
                ],
            },
        ]
    );
};

export default useRouter;