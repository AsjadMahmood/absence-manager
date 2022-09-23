import React from "react";
import { CustomChip } from "../components/CustomChip";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export function AbsenceFilter() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = () => {

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onOpenTypeFilter = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <div className="d-flex">
            <div>
                <CustomChip label="Filter Type" handleClick={onOpenTypeFilter} filled={false} hasDelete={true}></CustomChip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
            <div>
                <CustomChip label="Filter Type" handleClick={onOpenTypeFilter} filled={false} hasDelete={true}></CustomChip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </div>)
}