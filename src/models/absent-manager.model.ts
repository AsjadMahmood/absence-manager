export interface Absence{
    id:string,
    admitterNote: string,
    confirmedAt: Date,
    createdAt: Date,
    endDate: Date,
    memberNote: string,
    memberName:string,
    memberImage:string,
    rejectedAt: Date,
    startDate: Date,
    type: AbsenceType,
    userId: number,

}

export interface AbsenceFilterType{
    type: AbsenceTypeFilter, 
    absenceStartDate: Date, 
    absenceEndDate: Date
}

export enum AbsenceType{
    Sickness = "sickness",
    Vocation = "vocation"
}

export enum AbsenceStatus{
    Requested = "Requested",
    Confirmed = "Confirmed",
    Rejected = "Rejected"
}

export enum AbsenceTypeFilter{
    Sickness = "sickness",
    Vocation = "vocation",
    All = "all"
}

export const PER_PAGE = 10;