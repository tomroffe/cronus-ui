
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
                pixelRatio={2}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={3}
                colors="paired"
                colorBy="id"
                borderWidth={1}
                borderColor="inherit:darker(0.99)"
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={5}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={6}
                radialLabelsLinkHorizontalLength={8}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                enableRadialLabels={false}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                enableSlicesLabels={true}
                sliceLabel={function(e){
                    return accounting.formatMoney(e.value, "£ ", 0);
                }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "right",
                        "direction": "column",
                        "translateY": 170,
                        "translateX": 30,
                        "itemWidth": 100,
                        "itemHeight": 18,
                        "itemTextColor": "#999",
                        "symbolSize": 18,
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

