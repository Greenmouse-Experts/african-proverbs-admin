import React, { useEffect, useState } from 'react';
import _ from 'lodash';

const ProverbsCount = (props) => {
    const [proverbs, setProverbs] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        const data = props.data;

        // console.log("Datacoming", data)
        var result = _.chain(data)
            .groupBy("name")
            .map((value, key) => ({ name: key, proverb: value }))
            .value();
        //calc total
        const totalObj = {
            name: 'Total',
            proverb: [
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "ACCEPTED") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "ACCEPTED",
                    "name": "Hausa"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "AWAITING") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "AWAITING",
                    "name": "Total"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "REJECTED") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "REJECTED",
                    "name": "Total"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "CREATED") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "CREATED",
                    "name": "Total"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "UNPUBLISHED") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "UNPUBLISHED",
                    "name": "Total"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "PUBLISHED") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "PUBLISHED",
                    "name": "Total"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "WithAudio") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "WithAudio",
                    "name": "Total"
                },
                {
                    "count": data.reduce(function (a, b) {
                        if (b.status === "WithoutAudio") {
                            return a + Number(b['count']);
                        } else {
                            return a + 0;
                        }
                    }, 0),
                    "status": "WithoutAudio",
                    "name": "Total"
                }
            ]
        }
        // console.log("refined data", data)
        // console.log("refined data", totalObj)
        // console.log("result", result)
        result = [totalObj, ...result]

        // console.log("Result:", result)
        setProverbs(result)
    }
    return (
        <div>
            <ul class="nav nav-tabs">
                {proverbs.map((proverb, index) => (
                    <li class="nav-item" onClick={() => {
                        console.log("clicked", index)
                        setActiveIndex(index)
                    }}>
                        <a href={`#${proverb.name}`} data-toggle="tab" aria-expanded="false" class="nav-link active">
                            <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                            <span class="d-none d-sm-block">{proverb.name}</span>
                        </a>
                    </li>
                ))}
            </ul>

            <div class="tab-content">
                {proverbs.map((val, index) => (
                    <div role="tabpanel" class={`tab-pane fade ${activeIndex === index ? 'show active' : ''} total-proverbs`} id={`${val.name}`}>
                        <div className="row">
                            <div className="col-xl-4 col-md-3">
                                <font className="total-proverbs-count" size="+10">
                                    {val.proverb
                                        .filter(entry => entry.status !== 'WithAudio' && entry.status !== 'WithoutAudio')
                                        .reduce((acc, o) => acc + parseInt(o.count), 0)}
                                </font>
                            </div>
                            <div className="col-xl-8 col-md-9">
                                <div className="row">
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status" >Awaiting</p>
                                        <p>{val.proverb.some(val => val.status === 'AWAITING') ? (val.proverb.find(val => val.status === 'AWAITING')).count : 0}</p>
                                    </div>
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status">Accepted</p>
                                        <p>{val.proverb.some(val => val.status === 'ACCEPTED') ? (val.proverb.find(val => val.status === 'ACCEPTED')).count : 0}</p>
                                    </div>
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status" >Rejected</p>
                                        <p>{val.proverb.some(val => val.status === 'REJECTED') ? (val.proverb.find(val => val.status === 'REJECTED')).count : 0}</p>
                                    </div>
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status">Published</p>
                                        <p>{val.proverb.some(val => val.status === 'PUBLISHED') ? (val.proverb.find(val => val.status === 'PUBLISHED')).count : 0}</p>
                                    </div>
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status">Unpublished</p>
                                        <p>{val.proverb.some(val => val.status === 'UNPUBLISHED') ? (val.proverb.find(val => val.status === 'UNPUBLISHED')).count : 0}</p>
                                    </div>
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status">Created</p>
                                        <p>{val.proverb.some(val => val.status === 'CREATED') ? (val.proverb.find(val => val.status === 'CREATED')).count : 0}</p>
                                    </div>

                                    <div className="col-xl-4 col-md-3">
                                        <p className="status">With Audio</p>
                                        <p>{val.proverb.some(val => val.status === 'WithAudio') ? (val.proverb.find(val => val.status === 'WithAudio')).count : 0}</p>
                                    </div>
                                    <div className="col-xl-4 col-md-3">
                                        <p className="status">Without Audio</p>
                                        <p>{val.proverb.some(val => val.status === 'WithoutAudio') ? (val.proverb.find(val => val.status === 'WithoutAudio')).count : 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
}
export default ProverbsCount;