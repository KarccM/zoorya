/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import {
    Card,
    FormControl,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getExpandedRowModel,
} from "@tanstack/react-table";
import { FormattedMessage } from "react-intl";
//
import useQueryParams from "../../hooks/useQueryParams";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Iconify from "../Iconify";
import SearchNotFound from "../SearchNotFound";
import CustomToolbar from "./Partials/CustomToolbar";
import TablePaginationActions from "./TablePaginationActions";
import { ModalSpinner } from "../lib";

const SimpleBarStyle = styled(Card)({
    maxHeight: "100%",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
        height: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#707070",
        borderRadius: "6px",
        padding: "1px",
        visibility: "hidden",
    },
    "&:hover": {
        "&::-webkit-scrollbar-thumb": {
            visibility: "visible",
        },
    },
});

const PaginationTalbleFooter = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "3px 0 ",
});

const PaginationTableRow = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "3px 0 ",
});

const Pagination = styled("span")(() => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "3px 0 ",
    gap: "10px",
}));

const FormControlStyle = styled(FormControl)({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "3px 0 ",
});

const RootTable = styled(Table)(() => ({}));

function ReactTableV3({
    tableData,
    columns,
    isPaginated = true,
    isToolbar = true,
    filtered,
    searchBox,
    isLoading,
    renderSubComponent = () => { },
}) {
    const defaultData = React.useMemo(() => [], []);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const { setArrayOfQueryParams, removeArrayOfQueryParams, getQueryParams } = useQueryParams();
    const [columnVisibility, setColumnVisibility] = React.useState({})

    const [{ pageIndex, pageSize }, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

    const [sorting, setSorting] = React.useState(
        getQueryParams("sort") && getQueryParams("direction")
            ? [
                {
                    id: getQueryParams("sort"),
                    desc:
                        getQueryParams("direction") === "desc" ? true : false,
                },
            ]
            : []
    );

    React.useEffect(() => {
        if (pageIndex === 0) {
            removeArrayOfQueryParams(["page"]);
        } else {
            setArrayOfQueryParams([{ name: "page", value: pageIndex + 1 }]);
        }
    }, [pageIndex]);

    React.useEffect(() => {
        if (pageSize === 10) {
            removeArrayOfQueryParams(["limit"]);
        } else {
            setArrayOfQueryParams([{ name: "limit", value: pageSize }]);
        }
    }, [pageSize]);

    React.useEffect(() => {
        if (sorting.length === 0) {
            removeArrayOfQueryParams(["sort", "direction"]);
        } else {
            setArrayOfQueryParams([
                { name: "sort", value: sorting[0]?.id },
                { name: "direction", value: sorting[0]?.desc ? "desc" : "asc" },
            ]);
        }
    }, [sorting]);

    const table = useReactTable({
        data: tableData?.data ?? defaultData,
        columns,
        pageCount: tableData?.meta?.pages ?? 1,
        state: {
            sorting,
            pagination: { pageIndex, pageSize },
            globalFilter,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => true,
        onColumnVisibilityChange: setColumnVisibility,

    });
    const handleChangePage = (event, newPage) => {
        table.setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        table.setPageSize(parseInt(event.target.value, 10));
        table.setPageIndex(0);
    };

    if (isLoading) return <ModalSpinner />

    return (
        <SimpleBarStyle sx={{ overflowX: "auto" }}>
            {isToolbar ? (
                <CustomToolbar
                    selectedRows={""}
                    onDelete={() => { }}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    filtered={filtered}
                    searchBox={searchBox}
                    table={table}
                />
            ) : (
                <Box sx={{ height: 20 }} />
            )}
            <TableContainer sx={{ minWidth: 800 }}>
                <RootTable>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        key={header.id}
                                        {...{
                                            sx: header.column.getCanSort()
                                                ? { cursor: "pointer" }
                                                : null,
                                            onClick:
                                                header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        <div style={{ alignItems: "center", display: "flex" }}
                                        >
                                            {flexRender(<FormattedMessage id={header.column.columnDef.header} />, header.getContext())}
                                            {{
                                                asc: (
                                                    <Iconify icon="akar-icons:arrow-up" width={30} height={20} />
                                                ),
                                                desc: (
                                                    <Iconify icon="akar-icons:arrow-down" width={30} height={20} />
                                                ),
                                            }[header.column.getIsSorted()] ??
                                                null
                                            }
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <>
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <TableCell sx={cell.column?.style ?? null} align="left" key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    {row.getIsExpanded() && (
                                        <TableRow key={`${row.id}-${row.id}`}>
                                            <TableCell colSpan={row.getVisibleCells().length} align="left">
                                                {renderSubComponent(row.original)}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            );
                        })}
                    </TableBody>
                    {table.getRowModel().rows.length === 0 && (
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={12}
                                    sx={{ py: 3 }}
                                >
                                    <SearchNotFound
                                        isSearchQuery={isToolbar}
                                        searchQuery={getQueryParams("query") ? getQueryParams("query") : ""}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </RootTable>
            </TableContainer>
            <PaginationTableRow>
                {Boolean(isPaginated) && (
                    <Pagination>
                        <FormattedMessage id="rows_per_page" />
                        <FormControlStyle size="small">
                            <Select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <MenuItem key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControlStyle>
                    </Pagination>
                )}
                {Boolean(isPaginated) && (
                    <PaginationTalbleFooter>
                        <PaginationTableRow>
                            <TablePaginationActions
                                colSpan={3}
                                rowsPerPage={
                                    table.getState().pagination.pageSize
                                }
                                page={table.getState().pagination.pageIndex}
                                pageCount={table.getPageCount()}
                                SelectProps={{
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </PaginationTableRow>
                    </PaginationTalbleFooter>
                )}
            </PaginationTableRow>
        </SimpleBarStyle>
    );
}

export default ReactTableV3;
