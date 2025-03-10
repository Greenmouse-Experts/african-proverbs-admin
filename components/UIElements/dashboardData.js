

export const PieData=(data)=>{
    const allData = [];
    var obje = {};
    obje['Languages'] = data.languages;
    obje['Categories'] = data.categories;
    obje['Ethnics'] = data.ethnics;
    // obje['Proverbs'] = data.proverbs;
    allData.push(obje);
    return obje;
}

export const BarData=(data)=>{
    const allData = [];
    data.ethnic_data.map(value=>{
        var ethnic = []
        ethnic.push(value.ethnic_name);
        ethnic.push(parseInt(value.total_proverbs));
        allData.push(ethnic);
    })
    return allData;
}

export const ColumnChartData=(data)=>{
    const allData = [];
    data.proverbStatusCount.map(value=>{
        var status = []
        status.push(value.name);
        status.push(parseInt(value.value));
        allData.push(status);
    })
    return allData;
}