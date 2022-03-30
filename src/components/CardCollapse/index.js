import { Button, Card, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";

const CardCollapse = ({ cardChildren, collapseChildren, areaButton }) => {
    const [open, setOpen] = useState();

    return (
        <div
            className="container"
            style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                flexDirection: "column",
                padding: "0px",
                margin: "0px",
            }}
        >
            <div
                id="card"
                className="container"
                style={{
                    width: "100%",
                    justifyContent: "space-between",
                    backgroundColor: "#FFFFFF",
                    padding: "30px",
                    margin: "0px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    {cardChildren}
                </div>
                <div
                    className="area-button"
                    style={{
                        display: "flex",
                        minHeight: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    {areaButton}
                    <Button onClick={() => setOpen(!open)}>
                        {!open ? <ExpandMore /> : <ExpandLess />}
                    </Button>
                </div>
            </div>
            <Collapse
                style={{
                    overflow: "hidden",
                    backgroundColor: "#D9DCDA",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    borderBottomLeftRadius: "30px",
                    borderBottomRightRadius: "30px",
                }}
                in={open}
            >
                <div
                    style={{
                        backgroundColor: "#D9DCDA",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "100%",
                        justifyContent: "space-between",
                        padding: "30px",
                        margin: "0px",
                    }}
                >
                    {collapseChildren}
                </div>
            </Collapse>
        </div>
    );
};

export default CardCollapse;
