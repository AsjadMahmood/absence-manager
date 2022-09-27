import { DateFormatter } from "../../components/DateFormatter"
import { UserInfo } from "../../components/UserInfo"
import { Absence } from "../../models/absent-manager.model"
import { NormalDateFormat } from "../../utils/helpers"

type PropType = {
    absence: Absence
}

export function AbsenceRow(props: PropType) {

    return (
        <div className="w-100 d-flex justify-content-between align-items-center">
            <UserInfo thumbnail={props.absence.memberImage} name={props.absence.memberName} />
            <div>
                <span className="value-text">
                    <DateFormatter date={props.absence.startDate} format={NormalDateFormat} />
                </span>
                <span className="ms-2 me-1"> — </span>
                <span className="value-text">
                    <DateFormatter date={props.absence.endDate} format={NormalDateFormat} />

                </span>
            </div>
            <div>
                <mark className="text-capitalize">{props.absence.type}</mark>
            </div>
        </div>
    )

}