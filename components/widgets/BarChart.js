import { useRouter } from "next/router";
import { BarChart} from 'react-chartkick'
import 'chart.js'

const Bar = ({bardata}) => {
    return (
        <BarChart data={bardata} messages={{empty: "No data"}} label="Ethnics vs Total proverbs"/>
    )
}

export default Bar;