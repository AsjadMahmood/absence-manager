import './UserInfo.css'


type UserProp = {
    thumbnail: string,
    name: string
}

export function UserInfo(props:UserProp) {
    return (
        <div className="d-flex">
            <div>
                <img className="rounded-full" src={props.thumbnail} />
            </div>
            <div className="ms-1 p-1 mt-2">
                <div className="name-heading"> {`${props.name}`} </div>
            </div>
        </div>
    )
}