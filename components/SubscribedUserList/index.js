import { fetchSubscribers } from "@/store/actions/subscribersAction"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const SubScribedUSerList = ({ handleSelectUserid }) => {

    const dispatch = useDispatch()
    const { subscribers } = useSelector((state) => state.subscribers)

    useEffect(() => {
        dispatch(fetchSubscribers())
    }, [])

    return (


        <div>
            <ul class="list-group" style={{ listStyleType: "none" }}>
                {
                    subscribers && subscribers.map(({ id, firstName, lastName, email, active }) => {
                        return <li onClick={() => handleSelectUserid(id)} key={id}>
                            <p style={{ margin: ".5em 0", padding: ".2em 1em", cursor: "pointer", backgroundColor: `${active ? '#8cb369' : "white"}`, color: `${active ? 'white' : "#666"}` }}>Fullname: {firstName} {lastName} <br /> Email: {email}
                            </p>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default SubScribedUSerList