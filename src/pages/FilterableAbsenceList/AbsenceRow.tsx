import { UserInfo } from "../../components/UserInfo"
import { Absence } from "../../models/absent-manager.model"

type PropType = {
    absence: Absence
}

export function AbsenceRow(props: PropType){

    return(
        <div className="w-100 d-flex justify-content-between align-items-center">
            <UserInfo  thumbnail={props.absence.memberImage} name={props.absence.memberName} />
            <div>
                <mark className="me-1">From</mark>
                <span>{props.absence.startDate.toString()}</span>
                <mark className="ms-2 me-1">To</mark>
                <span>{props.absence.endDate.toString()}</span>
            </div>
            <div>
            <mark>{props.absence.type}</mark>
            </div>
        </div>
    )

}