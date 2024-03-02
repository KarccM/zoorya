import React from "react"
import { useSearchParams } from "react-router-dom"
//pagination Logic
//pass id and name
//read and translate into arabic

const defalutQueryParams = {
    page: 1,
    pageSize: 10,
    sorts: undefined,
    search: undefined
}

export function readQueryParams(guards = [], ignore = ['limit', 'type'], specialHandle = [(searchParams) => { }], defaultValues = []) {
    let [searchParams, setSearchParams] = useSearchParams()

    let query = {
        page: searchParams.get('page') || 1,
        pageSize: searchParams.get('limit') || 10,
        sorts: searchParams.get('sorts') || undefined,
        search: searchParams.get('query') || undefined
    }

    if (ignore.length > 0)
        for (const [key, value] of searchParams.entries())
            if (!ignore.includes(key))
                query[key] = value


    if (guards?.length > 0)
        for (const [key, value] of searchParams.entries()) {
            if (guards.includes(key)) {
                query[key] = value
            }
        }


    return query;
}

export { defalutQueryParams }