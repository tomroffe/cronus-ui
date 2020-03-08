
import React, { Component } from 'react'
import { ResponsivePie } from '@nivo/pie'
import accounting from 'accounting'

export default class Pie extends Component {

    render() {
        const { data } = this.props;

        return (
            <ResponsivePie
                data={data}
                fit={true}
                margin={{
                    "top": 42,
                    "right": 120,
                    "bottom": 120,
                    "left": 120
                }}

                innerRadius={0.4}
                padAngle={1}
                cornerRadius={3}
                colors="paired"
                colorBy="id"
                borderWidth={1}
                sortByValue={true}
                borderColor="inherit:darker(0.99)"
                radialLabelsSkipAngle={12}
                radialLabelsTextXOffset={5}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={6}
                radialLabelsLinkHorizontalLength={8}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                enableRadialLabels={true}
                slicesLabelsSkipAngle={18}
                slicesLabelsTextColor="#333333"
                enableSlicesLabels={true}
                sliceLabel={function (e) {
                    return accounting.formatMoney(e.value, "£ ", 0);
                }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                tooltip={function (e) { 
                    return e.label + " " +accounting.formatMoney(e.value, "£ ", 0);
                }}
                legends={[
                    {
                        "anchor": "right",
                        "direction": "column",
                        "translateY": 200,
                        "translateX": 60,
                        "itemWidth": 160,
                        "itemHeight": 16,
                        "itemTextColor": "#999",
                        "symbolSize": 14,
                        "symbolShape": "circle",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemTextColor": "#000"
                                }
                            }
                        ]
                    }
                ]}
            />
        );
    }
}

