import { useRouter } from "next/router";
import { ColumnChart } from 'react-chartkick'
import 'chart.js'

const Columnchart = ({bardata}) => {

    return (
        <>
        <ColumnChart  data={bardata} messages={{empty: "No data"}}/>
        </>
    )
}

export default Columnchart;