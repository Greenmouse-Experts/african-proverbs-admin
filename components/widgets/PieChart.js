import { useRouter } from "next/router";
import { PieChart} from 'react-chartkick'
import 'chart.js'

const Chart = ({data}) => {
    // const data = {"2020-01-03": 11, 
    // "2020-01-12": 9, "2020-01-20": 5, "2020-01-30": 15, 
    // "2020-02-4": 3, "2020-02-25": 9, "2020-03-05": 13, 
    // "2020-03-12": 6,"2020-05-12": 9, "2020-06-12": 3,
    // "2020-10-12": 9, "2020-12-25": 11}

    const ndata = [[
        "Users", data.users],
        ["Categories", data.categories],
        ["Proverbs", data.proverbs],
    ];

    return (
        <PieChart data={data} />
    )
}

export default Chart;