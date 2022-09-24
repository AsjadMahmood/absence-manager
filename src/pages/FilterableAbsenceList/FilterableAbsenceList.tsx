import React from "react";
import { Heading } from "../../components/Heading";
import { Absence, AbsenceFilterParameters, AbsenceType } from "../../models/absent-manager.model";
import { Headers } from "../../utils/helpers";
import Loading from "../../components/Loading";
import { AbsenceHeader } from "./AbsenceHeader";
import { AbsenceFilter } from "./AbsenceFilter";
import { AbsenceList } from "./AbsenceList";

type StateType = {
    absenceList ?: Array<Absence>,
    absenceFilter: AbsenceFilterParameters,
    loading: boolean
}

export class FilterableAbsenceList extends React.Component {

    state: StateType = {  loading: true, absenceFilter: { type: null, absenceEndDate: '', absenceStartDate: '' } };
    itemsPerPage: number = 10;
    absenceList: Array<Absence> = [];

    constructor(props: any) {
        super(props);
        this.handleAbsenceTypeFilter = this.handleAbsenceTypeFilter.bind(this);
        this.handleAbsencePeriodFilter = this.handleAbsencePeriodFilter.bind(this);
    }

    

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
        this.setState({ loading: false });
    }

    handleAbsenceTypeFilter(type: AbsenceType | null) {
        this.setState((prevState: StateType) => ({
            absenceFilter: {
                ...prevState.absenceFilter,
                type: type
            }
        }));
    }

    handleAbsencePeriodFilter(s: string, e: string) {
        this.setState((prevState: StateType) => ({
            absenceFilter: {
                ...prevState.absenceFilter,
                absenceStartDate: s,
                absenceEndDate: e
            }
        }));
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
                <div>
                    <AbsenceHeader size={this.absenceList.length}>
                        <AbsenceFilter absenceFilter={this.state.absenceFilter}
                            handleAbsenceFilterType={this.handleAbsenceTypeFilter}
                            handleAbsencePeriodFilter={this.handleAbsencePeriodFilter} />
                    </AbsenceHeader>
                </div>
                <div className="row justify-content-center">
                    {!this.state.loading ?
                        <div className="col-md-8">
                            <AbsenceList absenceList={this.absenceList} absenceFilter={this.state.absenceFilter} 
                            />
                        </div>
                        : <Loading align="center" />
                    }
                </div>
            </div>
        )
    }

}