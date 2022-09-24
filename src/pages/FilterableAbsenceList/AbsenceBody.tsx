import { Absence, AbsenceStatus } from "../../models/absent-manager.model"

type PropType = {
    absence: Absence
}



export function AbsenceBody(props: PropType) {

    let statusColor: string = 'blue';

    const getType = () => {
        if (props.absence.rejectedAt) {
            statusColor = 'red';
            return AbsenceStatus.Rejected
        }
        else if (props.absence.confirmedAt) {
            statusColor = 'green';
            return AbsenceStatus.Confirmed
        }
        return AbsenceStatus.Requested
    }

    return (
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <img width={220} height={220} src={props.absence.memberImage} alt="" />
            </div>
            <div className="mt-3 col-md-8 col-sm-12">
                <div className="row mb-4">
                    <div className="col-6">
                        <span className="me-2"> Name </span>
                        <span > {props.absence.memberName} </span>
                    </div>
                    <div className="col-6">
                        <span className="me-2"> Type </span>
                        <span > {props.absence.type} </span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <span className="me-2"> Period </span>
                        <span > {props.absence.startDate} -   {props.absence.endDate}</span>
                    </div>
                    <div className="col-6">
                        <span className="me-2"> Status </span>
                        <span style={{ color: `${statusColor}` }}> {getType()} </span>
                    </div>
                </div>
                {props.absence.memberNote &&
                    <div className="d-flex mb-4">
                        <span className="me-2">Member Note :</span>
                        <span> {props.absence.memberNote} </span>
                    </div>
                }
                {props.absence.admitterNote &&
                    <div className="d-flex mb-4">
                        <span className="me-2">Admitter Note :</span>
                        <span>{props.absence.admitterNote}  </span>
                    </div>
                }
            </div>
        </div>
    )
}