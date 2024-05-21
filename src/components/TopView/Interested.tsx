import { FC } from "react"

interface InterestedI {
    which:string
    
}

const Interested:FC<InterestedI> = ({which}) => {
    return (
        <div>
            {which}
        </div>
    )
}

export default Interested
