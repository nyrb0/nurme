import { FC } from "react"
import { Title } from "../../types/UpdateA"
import { useParams } from "react-router-dom"
import { useGetTheTitleQuery } from "../../API/animeData"

interface SingleAnimeItemProps {
    single?:Title
}
const SingleAnimeItem:FC<SingleAnimeItemProps> = ({
    single
}) => {
    const {id} = useParams<{id:string}>()
    const {data,isError,isLoading} = useGetTheTitleQuery({id:id ||''})
    console.log(data)
    return (
        <div>
            {data?.names.ru}
        </div>
    )
}

export default SingleAnimeItem
