type PropType = {
    size: number,
    children: React.ReactNode
} 

export function AbsenceHeader(props:PropType) {
    return (
        <div className="row justify-content-center mb-3">
            <div className="col-md-8 d-flex justify-content-between">
                <strong style={{ color: 'rgb(82, 82, 91)' }}>
                    {props.size} requests submitted
                </strong>
                <div className="d-flex">
                <strong style={{ color: 'rgb(82, 82, 91)' }}>
                    Filter By
                </strong>
                   {props.children}
                </div>
            </div>
        </div>
    )
}