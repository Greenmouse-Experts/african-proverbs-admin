import { useRouter } from "next/router";
import { LineChart } from 'react-chartkick'
import 'chart.js'

const ChartKick = () => {
    const data = {"2020-01-03": 11, 
    "2020-01-12": 9, "2020-01-20": 5, "2020-01-30": 15, 
    "2020-02-4": 3, "2020-02-25": 9, "2020-03-05": 13, 
    "2020-03-12": 6,"2020-05-12": 9, "2020-06-12": 3,
    "2020-10-12": 9, "2020-12-25": 11}

    return (
        <LineChart messages={{empty: "No data"}} label="cards per day"  data={data} />
    )
}

export default ChartKick;