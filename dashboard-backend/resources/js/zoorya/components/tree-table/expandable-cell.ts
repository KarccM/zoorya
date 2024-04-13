import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ExpandableCell {
  header: string,
  render: ({ row, expanded, setExpanded, lvl } : {row:any, expanded:boolean, setExpanded: Dispatch<SetStateAction<boolean>>, lvl:number }) => ReactNode
}