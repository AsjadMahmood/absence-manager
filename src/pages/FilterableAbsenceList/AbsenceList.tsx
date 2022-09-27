import { Absence, AbsenceFilterParameters, AbsenceType, UserMessageType } from "../../models/absent-manager.model"
import { AbsenceRow } from "./AbsenceRow";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserFriendlyError from "../../components/UserFriendlyError";
import { AbsenceBody } from "./AbsenceBody";
import React, { useEffect, useState } from "react";
import { CustomPagination } from "../../components/Pagination";
import Divider from "@mui/material/Divider";
import { AbsenceHeader } from "./AbsenceHeader";
import moment from "moment";

type PropType = {
    absenceList: Array<Absence>|null
    absenceFilter: AbsenceFilterParameters;
    children: React.ReactNode
}

export function AbsenceList(props: PropType) {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;

    const applyFilter = (): Array<Absence> => {
        let tempList: Absence[] = [];
        if (props.absenceList && props.absenceList.length > 0) {
            props.absenceList.forEach((absence: Absence) => {
                if (props.absenceFilter.type && absence.type !== props.absenceFilter.type)
                    return
                if (props.absenceFilter.absenceStartDate && moment(absence.startDate) >= moment(props.absenceFilter.absenceStartDate)) {
                    return
                }
                if (props.absenceFilter.absenceEndDate && moment(absence.endDate) <= moment(props.absenceFilter.absenceEndDate)) {
                    return
                }
                tempList.push(absence);
            })
        }
        return tempList;
    }

    let filteredRows: Array<Absence> = applyFilter();

    const getPaginatedData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return filteredRows.slice(begin, end);
    }

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div>
                <AbsenceHeader size={filteredRows.length}>
                    {props.children}
                </AbsenceHeader>
            </div>
            <div>
                {
                    filteredRows.length > 0 ? getPaginatedData().map((absence: Absence) => {
                        return (
                            <Accordion key={absence.id} data-testid="absence-list">
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <AbsenceRow absence={absence} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider />
                                    <AbsenceBody absence={absence} />
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
        </>
    )
}