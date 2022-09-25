import React from "react";
import { Heading } from "../../components/Heading";
import { Absence, AbsenceFilterParameters, AbsenceType } from "../../models/absent-manager.model";
import { Headers } from "../../utils/helpers";
import Loading from "../../components/Loading";
import { AbsenceHeader } from "./AbsenceHeader";
import { AbsenceFilter } from "./AbsenceFilter";
import { AbsenceList } from "./AbsenceList";
import moment from "moment";

type StateType = {
    absenceList? : Array<Absence>,
    absenceFilter: AbsenceFilterParameters,
    loading: boolean
}

export class FilterableAbsenceList extends React.Component {

    state: StateType = { loading: true, absenceFilter: { type: null, absenceEndDate: '', absenceStartDate: '' } };
    itemsPerPage: number = 10;
    responseDataList: Array<Absence> = [];
    filtertedList: Array<Absence> = this.applyFilter();

    constructor(props: any) {
        super(props);
        this.handleAbsenceTypeFilter = this.handleAbsenceTypeFilter.bind(this);
        this.handleAbsencePeriodFilter = this.handleAbsencePeriodFilter.bind(this);
    }

    async getData() {
        this.setState({ loading: true });
        this.responseDataList = [];
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
                    this.responseDataList.push(absenceInstance);
                }
            })
        })
        console.log(this.responseDataList);
        this.setState({loading: false});
        //debugger
        //this.filtertedList = JSON.parse(JSON.stringify(this.responseDataList));    
    }

    handleAbsenceTypeFilter(type: AbsenceType | null) {
        this.setState((prevState: StateType) => ({
            absenceFilter: {
                ...prevState.absenceFilter,
                type: type
            }
        }));
        //this.applyFilter()
    }

    handleAbsencePeriodFilter(s: string, e: string) {
        this.setState((prevState: StateType) => ({
            absenceFilter: {
                ...prevState.absenceFilter,
                absenceStartDate: s,
                absenceEndDate: e
            }
        }));
        //this.applyFilter();
    }

    applyFilter():Array<Absence>{
        let tempList:Absence[] = [];
        if (this.responseDataList.length > 0) {
            this.responseDataList.forEach((absence: Absence) => {
                if (this.state.absenceFilter.type && absence.type !== this.state.absenceFilter.type)
                    return
                if (this.state.absenceFilter.absenceStartDate && moment(absence.startDate) >= moment(this.state.absenceFilter.absenceStartDate)) {
                    return
                }
                if (this.state.absenceFilter.absenceEndDate && moment(absence.endDate) <= moment(this.state.absenceFilter.absenceEndDate)) {
                    return
                }
                tempList.push(absence);
            })
        }
        return tempList;
    }

    componentDidMount(): void {
        this.getData();
    }

    // componentDidUpdate(prevState: Readonly<StateType>,): void {

    //         this.applyFilter();

    // }

    render(): React.ReactNode {
        return (
            <div>
                <div className="text-center mt-5">
                    <Heading name="Absences List" /><br />
                </div>
                <div>
                    <AbsenceHeader size={this.applyFilter().length}>
                        <AbsenceFilter absenceFilter={this.state.absenceFilter}
                            handleAbsenceFilterType={this.handleAbsenceTypeFilter}
                            handleAbsencePeriodFilter={this.handleAbsencePeriodFilter} />
                    </AbsenceHeader>
                </div>
                <div className="row justify-content-center">
                    {!this.state.loading ?
                        <div className="col-md-8">
                            <AbsenceList absenceList={this.applyFilter()}
                            />
                        </div>
                        : <Loading align="center" />
                    }
                </div>
            </div>
        )
    }
}