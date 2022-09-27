type PropType = {
    size: number,
    children: React.ReactNode
} 

export function AbsenceHeader(props:PropType) {
    return (
        <div className="row justify-content-center mb-3">
            <div className="d-flex justify-content-between">
                <strong className="mt-1" style={{ color: 'rgb(82, 82, 91)' }}>
                    {props.size} requests submitted
                </strong>
                <div className="d-flex" style={{gap:'1.5rem'}}>
                <strong className="mt-1" style={{ color: 'rgb(82, 82, 91)' }}>
                    Filter By
                </strong>
                   {props.children}
                </div>
            </div>
        </div>
    )
}