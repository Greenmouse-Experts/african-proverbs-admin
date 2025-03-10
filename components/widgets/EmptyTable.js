import React from 'react';
import Button from '@/components/UIElements/Button';

const EmptyTable = (props) => {
    return (
        <div className="no-enq" style={{ margin: props.margin || "" }}>
            <div className="no-enq-img">
                <img
                    src="/static/assets/images/no-lead.svg"
                    alt="Empty state image"
                    style={{height: props.height ||  "", width: props.width || ""}}
                />
            </div>
            {props.text && (
                <div
                    className="no-enq-text"
                    style={{
                        fontWeight: props.lightText ? 400 : "",
                        color: props.lightText ? "#5e7079" : "",
                        marginTop: props.lightText ? "-10px" : "",
                    }}
                >
                    {props.text}
                </div>
            )}
            {props.action && (
                <div
                    className="no-enq-link"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Button
                        type={props.btnType || "primary"}
                        text={props.text}
                        onClick={() => props.action()}
                    />
                </div>
            )}
        </div>
    )
}
export default EmptyTable;