export interface Absence{
    id:string,
    admitterNote: string,
    confirmedAt: Date,
    createdAt: Date,
    endDate: string,
    memberNote: string,
    memberName:string,
    memberImage:string,
    rejectedAt: Date,
    startDate: string,
    type: AbsenceType,
    userId: number,

}

export interface AbsenceFilterParameters{
    type: AbsenceType | null, 
    absenceStartDate: string | null, 
    absenceEndDate: string| null
}

export enum AbsenceStatus{
    Requested = "Requested",
    Confirmed = "Confirmed",
    Rejected = "Rejected"
}

export enum AbsenceType{
    Sickness = "sickness",
    Vacation = "vacation",
}

export enum UserMessageType{
    NoDataFound = "no data found",
    SomethingWentWrong = "something went wrong",
}


export const PER_PAGE = 10;