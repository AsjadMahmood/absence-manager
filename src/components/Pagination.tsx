import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";

// 

type PropType = {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    handlePageChange: (e: React.ChangeEvent<unknown>, p: number)=>void,
}


export function CustomPagination(props:PropType) {

    const pageCount = Math.ceil(props.totalItems / props.itemsPerPage);

    return(
        <Pagination
        count={pageCount}
        size="large"
        page={props.currentPage}
        variant="outlined"
        shape="rounded"
        onChange={(e,p)=>{props.handlePageChange(e,p)}}
    />
    )

}