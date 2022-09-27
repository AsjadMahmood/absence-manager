import React from "react";
import { CustomChip } from "../../components/CustomChip";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AbsenceFilterParameters, AbsenceType } from "../../models/absent-manager.model";
import moment from "moment";
import Divider from "@mui/material/Divider";

type PropType = {
    absenceFilter: AbsenceFilterParameters,
    handleAbsenceFilterType: (type: AbsenceType | null) => void
    handleAbsencePeriodFilter: (s: string, e: string) => void
}

export function AbsenceFilter(props: PropType) {

    const [anchorElForTypeFilter, setAnchorElForTypeFilter] = React.useState<null | HTMLElement>(null);
    const [anchorElForDateFilter, setAnchorElForDateFilter] = React.useState<null | HTMLElement>(null);
    const [absentTypeFilterApplied, setAbsentTypeFilterApplied] = React.useState<boolean>(false);
    const [absentDateFilterApplied, setAbsentDateFilterApplied] = React.useState<boolean>(false);

    const openTypeFilter = Boolean(anchorElForTypeFilter);
    const openDateFilter = Boolean(anchorElForDateFilter);

    const applyAbsenceTypeFilter = (type: AbsenceType | null) => {
        props.handleAbsenceFilterType(type);
        setAnchorElForTypeFilter(null);
        type ? setAbsentTypeFilterApplied(true) : setAbsentTypeFilterApplied(false);
    }

    const onOpenAbsenceTypeFilter = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorElForTypeFilter(event.currentTarget);
    }

    const onDeleteAbsenceTypeFilter = () => {
        applyAbsenceTypeFilter(null);
    }

    const applyAbsenceDateFilter = (s: string, e: string) => {
        props.handleAbsencePeriodFilter(s, e);
        setAnchorElForDateFilter(null);
        (s && e) ? setAbsentDateFilterApplied(true) : setAbsentDateFilterApplied(false);
    }

    const onOpenAbsenceDateFilter = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorElForDateFilter(event.currentTarget);
    }

    const onDeleteAbsenceDateFilter = () => {
        applyAbsenceDateFilter('', '')
    }

    return (
        <div className="d-flex" style={{gap:'0.5rem'}}>
            <div>
                <CustomChip label="Absence Type" handleClick={onOpenAbsenceTypeFilter}
                    isFilled={absentTypeFilterApplied} hasDelete={absentTypeFilterApplied}
                    handleDelete={onDeleteAbsenceTypeFilter} />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElForTypeFilter}
                    open={openTypeFilter}
                    onClose={() => { setAnchorElForTypeFilter(null) }}
                >
                    <MenuItem onClick={() => { applyAbsenceTypeFilter(AbsenceType.Vacation) }}>Vacation</MenuItem>
                    <MenuItem onClick={() => { applyAbsenceTypeFilter(AbsenceType.Sickness) }}>Sickness</MenuItem>
                </Menu>
            </div>
            <div>
                <CustomChip label="Absence Date" handleClick={onOpenAbsenceDateFilter}
                    isFilled={absentDateFilterApplied} hasDelete={absentDateFilterApplied}
                    handleDelete={onDeleteAbsenceDateFilter} />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElForDateFilter}
                    open={openDateFilter}
                    onClose={() => { setAnchorElForDateFilter(null) }}
                >
                    <MenuItem onClick={() => { applyAbsenceDateFilter(moment().toString(), moment().subtract(1, 'w').toString()) }}>One Week Ago</MenuItem>
                    <MenuItem onClick={() => { applyAbsenceDateFilter(moment().toString(), moment().subtract(1, 'M').toString()) }}>One Month Ago</MenuItem>
                    <MenuItem onClick={() => { applyAbsenceDateFilter(moment().toString(), moment().subtract(6, 'M').toString()) }}>Six Months Ago</MenuItem>
                    <MenuItem onClick={() => { applyAbsenceDateFilter(moment().toString(), moment().subtract(2, 'y').toString()) }}>Two Year Ago</MenuItem>
                    <Divider />
                    <MenuItem disabled={true} onClick={() => { applyAbsenceTypeFilter(AbsenceType.Vacation) }}>Custom Range</MenuItem>
                </Menu>
            </div>
        </div>)
}