import { DateFormatter } from "../../components/DateFormatter";
import { Absence, AbsenceStatus } from "../../models/absent-manager.model"
import { NormalDateFormat } from "../../utils/helpers";

type PropType = {
    absence: Absence
}

export function AbsenceBody(props: PropType) {

    const setStatus = () => {
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

    let statusColor: string = 'blue';
    let status: AbsenceStatus = setStatus();


    return (
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <img width={220} height={220} src={props.absence.memberImage} alt="" />
            </div>
            <div className="mt-3 col-md-8 col-sm-12">
                <div className="row mb-4">
                    <div className="col-8">
                        <span className="me-2 default-label"> Name </span>
                        <span className="value-text"> {props.absence.memberName} </span>
                    </div>
                    <div className="col-4">
                        <span className="me-2 default-label"> Type </span>
                        <span className="text-capitalize value-text"> {props.absence.type} </span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-8">
                        <span className="me-2 default-label"> Period </span>
                        <span className="value-text">
                            <DateFormatter date={props.absence.startDate} format={NormalDateFormat} /> -   <DateFormatter date={props.absence.endDate} format={NormalDateFormat} />
                        </span>
                    </div>
                    <div className="col-4">
                        <span className="me-2 default-label"> Status </span>
                        <span className="value-text" style={{ color: `${statusColor}` }}> {status} </span>
                    </div>
                </div>
                {props.absence.memberNote &&
                    <div className="d-flex mb-4">
                        <span className="me-2 default-label">Member Note :</span>
                        <span className="value-text"> {props.absence.memberNote} </span>
                    </div>
                }
                {props.absence.admitterNote &&
                    <div className="d-flex mb-4">
                        <span className="me-2 default-label">Admitter Note :</span>
                        <span className="value-text">{props.absence.admitterNote}  </span>
                    </div>
                }
            </div>
        </div>
    )
}