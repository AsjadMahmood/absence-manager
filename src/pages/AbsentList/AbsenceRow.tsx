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
                <span>From : </span>
                <span>{props.absence.startDate.toString()}</span>
                <span>To : </span>
                <span>{props.absence.endDate.toString()}</span>
            </div>
            <div>
            <mark>{props.absence.type}</mark>
            </div>
        </div>
    )

}