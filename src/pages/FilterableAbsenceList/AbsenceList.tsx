import { Absence, AbsenceFilterParameters, AbsenceType, UserMessageType } from "../../models/absent-manager.model"
import { AbsenceRow } from "./AbsenceRow";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserFriendlyError from "../../components/NoDataFound";
import { AbsenceBody } from "./AbsenceBody";
import React, { useEffect, useState } from "react";
import { CustomPagination } from "../../components/Pagination";
import moment from "moment";
import Divider from "@mui/material/Divider";

type PropType = {
    absenceList: Array<Absence>
    absenceFilter: AbsenceFilterParameters;
}

export function AbsenceList(props: PropType) {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;
    let filteredRows: Array<Absence> = [];

    const currentData = () => {
        applyFilter();
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return filteredRows.slice(begin, end);
    }

    const applyFilter = () => {
        if (props.absenceList.length > 0) {
            props.absenceList.forEach((absence: Absence) => {
                if (props.absenceFilter.type && absence.type !== props.absenceFilter.type)
                    return
                if (props.absenceFilter.absenceStartDate && moment(absence.startDate) >= moment(props.absenceFilter.absenceStartDate)) {
                    return
                }
                if (props.absenceFilter.absenceEndDate && moment(absence.endDate) <= moment(props.absenceFilter.absenceEndDate)) {
                    return
                }
                filteredRows.push(
                    absence
                )
            })
        }
    }

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };


    return (
        <div>
            {
                props.absenceList.length > 0 ? currentData().map((absence: Absence) => {
                    return (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <AbsenceRow absence={absence} />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider />
                                <AbsenceBody absence={absence}/>
                            </AccordionDetails>
                        </Accordion>
                    )
                }) : <div> <UserFriendlyError type={UserMessageType.NoDataFound} /> </div>
            }
            <div className="d-flex mb-5 mt-4 justify-content-center">
                <CustomPagination totalItems={filteredRows.length} itemsPerPage={itemsPerPage}
                    currentPage={currentPage} handlePageChange={handlePageChange} />
            </div>

        </div>
    )
}