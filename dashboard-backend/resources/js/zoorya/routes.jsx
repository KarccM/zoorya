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
                        path: "services",
                        handle: {
                            crumb: () => <Link to="/services">services</Link>,
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
                        ],
                    },
                    {
                        path: "sliders",
                        handle: {
                            crumb: () => <Link to="/sliders">sliders</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let service = await import('./screens/sliders')
                                    return { Component: service.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let service = await import('./screens/sliders/add')
                                    return { Component: service.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_slider</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let service = await import('./screens/sliders/edit')
                                    return { Component: service.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_slider</Link>
                                    ),
                                },
                            },
                        ],
                    },
                    {
                        path: "categories",
                        handle: {
                            crumb: () => <Link to="/categories">categories</Link>,
                        },
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let category = await import('./screens/categories')
                                    return { Component: category.default };
                                },
                            },
                            {
                                path: "add",
                                lazy: async () => {
                                    let category = await import('./screens/categories/add')
                                    return { Component: category.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/add">new_category</Link>
                                    ),
                                },
                            },
                            {
                                path: ":parentId/add",
                                lazy: async () => {
                                    let category = await import('./screens/categories/add')
                                    return { Component: category.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:parentId/add">add_category</Link>
                                    ),
                                },
                            },
                            {
                                path: ":id/edit",
                                lazy: async () => {
                                    let category = await import('./screens/categories/edit')
                                    return { Component: category.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_category</Link>
                                    ),
                                },
                            },
                            {
                                path: ":categoryId/dog/add",
                                lazy: async () => {
                                    let dog = await import('./screens/categories/partials/dog-form')
                                    return { Component: dog.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">add_dog</Link>
                                    ),
                                },
                            },
                            {
                                path: ":categoryId/dog/:id/edit",
                                lazy: async () => {
                                    let dog = await import('./screens/categories/partials/dog-form')
                                    return { Component: dog.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_dog</Link>
                                    ),
                                },
                            },
                            {
                                path: ":categoryId/cat/add",
                                lazy: async () => {
                                    let cat = await import('./screens/categories/partials/cat-form')
                                    return { Component: cat.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">add_cat</Link>
                                    ),
                                },
                            },
                            {
                                path: ":categoryId/cat/:id/edit",
                                lazy: async () => {
                                    let cat = await import('./screens/categories/partials/cat-form')
                                    return { Component: cat.default };
                                },
                                handle: {
                                    crumb: () => (
                                        <Link to="/:id/edit">edit_cat</Link>
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
