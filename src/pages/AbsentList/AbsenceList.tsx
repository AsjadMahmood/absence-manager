import React from "react";
import { Heading } from "../../components/Heading";
import { Absence, AbsenceFilterType, PER_PAGE } from "../../models/absent-manager.model";
import { Headers } from "../../utils/helpers";
import { AbsenceFilter } from "../AbsenceFilter";
import { AbsenceRow } from "./AbsenceRow";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomPagination } from "../../components/Pagination";

type StateType = {
    absenceList: Array<Absence>,
    absenceFilter: '',
    currentPage: number,
    loading: boolean
}

export class AbsenceList extends React.Component {

    state: StateType = { absenceList: [], absenceFilter: '', currentPage: 1, loading: false };
    itemsPerPage: number = 10;


    constructor(props: any) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    absenceList: Array<Absence> = [];

    async getData() {
        this.setState({ loading: true });
        this.absenceList = [];
        const absencesResponse = await (await fetch('src/api/absences.json', { headers: Headers })).json();
        const memberResponse = await (await fetch('src/api/members.json', { headers: Headers })).json();

        absencesResponse.payload.forEach((absence: any) => {
            memberResponse.payload.forEach((member: any) => {
                if (absence.userId === member.userId) {
                    let absenceInstance: Absence = {
                        id: absence.id,
                        userId: member.userId,
                        memberName: member.name,
                        memberImage: member.image,
                        memberNote: absence.memberNote,
                        admitterNote: absence.admitterNote,
                        confirmedAt: absence.confirmedAt,
                        createdAt: absence.createdAt,
                        startDate: absence.startDate,
                        endDate: absence.endDate,
                        rejectedAt: absence.rejectedAt,
                        type: absence.type
                    };
                    this.absenceList.push(absenceInstance);
                }
            })
        })
        console.log(this.absenceList);
        this.setState({ absenceList: this.absenceList, loading: false });
    }

    handlePageChange(e: React.ChangeEvent<unknown>, p: number) {
        this.setState({ currentPage: p });
    };

    setAbsenceList() {

    }

    currentData() {
        const begin = (this.state.currentPage - 1) * this.itemsPerPage;
        const end = begin + this.itemsPerPage;
        return this.state.absenceList.slice(begin, end);
    }

    componentDidMount(): void {
        this.getData();
    }


    render(): React.ReactNode {
        return (
            <div>
                <div className="text-center mt-5">
                    <Heading name="Absences List" /><br />
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-8 d-flex justify-content-between">
                        <strong style={{ color: 'rgb(82, 82, 91)' }}>
                            {this.state.absenceList.length} requests submitted
                        </strong>
                        <div>
                            <AbsenceFilter />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {
                            this.state.absenceList.length > 0 ? this.currentData().map((absence: Absence) => {
                                return (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <AbsenceRow absence={absence} />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            }) : <div>Not Found Component</div>
                        }
                        <CustomPagination totalItems={this.state.absenceList.length} itemsPerPage={this.itemsPerPage}
                            currentPage={this.state.currentPage} handlePageChange={this.handlePageChange} />
                    </div>

                </div>
            </div>
        )
    }

}