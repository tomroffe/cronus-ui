/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'

const theme = {
    fontFamily: 'sans-serif',
    fontSize: 26,
  };

export default class Graph extends Component {

    render() {
        const { data } = this.props;

        return (     
            <ResponsiveCalendar
                data={data}
                from="2014-01-01"
                to="2018-12-31"
                emptyColor="#eeeeee"
                domain={'auto'}
                margin={{
                    "top": 50,
                    "right": 20,
                    "bottom": 50,
                    "left": 50
                }}
                theme={theme}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                monthLegendOffset={16}
                dayBorderWidth={3}
                dayBorderColor="#fafafa"
                colors={[
                    '#a1cfff',
                    '#468df3',
                    '#a053f0',
                    '#9629f0',
                    '#8428d8'
                  ]}
                legends={[
                    {
                        "anchor": "bottom",
                        "direction": "row",
                        "translateY": 40,
                        "itemWidth": 28,
                        "itemHeight": 32,
                        "itemCount": 5,
                        "symbolSize": 14,
                        "symbolShape": "circle",
                        "itemDirection": "top-to-bottom"
                    }
                ]}
                />
        );
    }
}

