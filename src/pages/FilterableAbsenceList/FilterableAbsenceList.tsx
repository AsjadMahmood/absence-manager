import React from "react";
import { Heading } from "../../components/Heading";
import { Absence, AbsenceFilterParameters, AbsenceType, UserMessageType } from "../../models/absent-manager.model";
import { Headers } from "../../utils/helpers";
import Loading from "../../components/Loading";
import { AbsenceFilter } from "./AbsenceFilter";
import { AbsenceList } from "./AbsenceList";
import UserFriendlyError from "../../components/UserFriendlyError";

type StateType = {
    absenceFilter: AbsenceFilterParameters,
    loading: boolean
}

export class FilterableAbsenceList extends React.Component {

    state: StateType = { loading: true, absenceFilter: { type: null, absenceEndDate: '', absenceStartDate: '' } };
    itemsPerPage: number = 10;
    responseDataList: Array<Absence> | null = [];

    constructor(props: any) {
        super(props);
        this.handleAbsenceTypeFilter = this.handleAbsenceTypeFilter.bind(this);
        this.handleAbsencePeriodFilter = this.handleAbsencePeriodFilter.bind(this);
    }

    async getData() {
        this.setState({ loading: true });
        this.responseDataList = [];
        try {
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
                        if (this.responseDataList)
                            this.responseDataList.push(absenceInstance);
                    }
                })
            })
        }
        catch {
            this.responseDataList = null;
        }
        console.log(this.responseDataList);
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
                <div className="text-center mt-3">
                    <Heading name="Absences List" /><br />
                </div>
                {this.responseDataList ?
                    <div className="row justify-content-center">
                        {!this.state.loading ?
                            <div className="col-md-8">
                                <AbsenceList absenceList={this.responseDataList} absenceFilter={this.state.absenceFilter}>
                                    <AbsenceFilter absenceFilter={this.state.absenceFilter}
                                        handleAbsenceFilterType={this.handleAbsenceTypeFilter}
                                        handleAbsencePeriodFilter={this.handleAbsencePeriodFilter} />
                                </AbsenceList>
                            </div>
                            : <Loading align="center" />
                        }
                    </div>
                    : <UserFriendlyError type={UserMessageType.SomethingWentWrong} />
                }
            </div>
        )
    }
}