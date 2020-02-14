//各县市确诊病例 柱状图
function getChartsBarOne(xObj, yObj) {
    // 基于准备好的dom，初始化echarts实例
    var chartbar1 = echarts.init(document.getElementById('chart-bar-01'));

    // 指定图表的配置项和数据
    option = {
        title: {
            text: '各区确诊病例',
            textStyle: {
                color: '#afafbd',
                fontSize: 14
            },
            top: '5'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '0',
            top: '40',
            containLabel: true,
            borderColor: '#28387d'
        },
        xAxis: {
            data: xObj,
            axisLabel: {
                color: '#dddddd',
                rotate: 50,
                fontSize: 9
            },
            axisLine: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#28387d'
                }
            }
        },
        yAxis: {
            axisLabel: {
                color: '#dddddd',
                fontSize: 9
            },
            axisLine: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#192456'
                }
            },
            minInterval: 1
        },
        series: [{
            data: yObj,
            type: 'bar',
            label: {
                show: true,
                rotate: 90,
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    chartbar1.setOption(option);
}

// 确诊病例趋势 折线图
function getChartsLineOne(xObj, yObj, yObj2, yObj3) {
    // 基于准备好的dom，初始化echarts实例
    var chartline1 = echarts.init(document.getElementById('chart-line-01'));

    option = {
        color: ['#f55253','rgb(42, 215, 54)','rgb(153, 153, 153)'],
        legend: {
            right :20,
            textStyle:{
                color:'#fff',
                fontSize: 9
            },
            padding: [
                5,  // 上
                0, // 右
                5,  // 下
                10, // 左
            ],
            // orient:'vertical',
            data: ['确诊', '治愈', '死亡']
        },
        title: {
            text: '疫情累计趋势',
            textStyle: {
                color: '#afafbd',
                fontSize: 14
            },
            top: '5'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '0',
            top: '40',
            containLabel: true,
            borderColor: '#28387d'
        },
        xAxis: {
            data: xObj,
            axisLabel: {
                color: '#dddddd',
                rotate: 90,
                fontSize: 9
            },
            axisLine: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#28387d'
                }
            },
        },
        yAxis: {
            axisLabel: {
                color: '#dddddd',
                fontSize: 9
            },
            axisLine: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#192456'
                }
            },
            minInterval: 1
        },
        series: [{
            data: yObj,
            type: 'line',
            name: '确诊',
            smooth: true,
            label: {
                normal: {
                    show: true,
                    fontSize: 9,
                    position: 'top'
                }
            }
        },
            {
                data: yObj2,
                type: 'line',
                name: '治愈',
                smooth: true,
                label: {
                    normal: {
                        show: true,
                        fontSize: 9,
                        position: 'top'
                    }
                }
            },
            {
                data: yObj3,
                type: 'line',
                name: '死亡',
                smooth: true,
                label: {
                    normal: {
                        show: true,
                        fontSize: 9,
                        position: 'top'
                    }
                }
            }]
    };

    // 使用刚指定的配置项和数据显示图表。
    chartline1.setOption(option);
}

// 新增病例趋势 折线图
function getChartsLineTwo(xObj, yObj) {
    // 基于准备好的dom，初始化echarts实例
    var chartline2 = echarts.init(document.getElementById('chart-line-02'));

    option = {
        title: {
            text: '新增病例趋势',
            textStyle: {
                color: '#afafbd',
                fontSize: 14
            },
            top: '5'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '0',
            top: '40',
            containLabel: true,
            borderColor: '#28387d'
        },
        xAxis: {
            data: xObj,
            axisLabel: {
                color: '#dddddd',
                rotate: 90,
                fontSize: 9
            },
            axisLine: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#28387d'
                }
            },
        },
        yAxis: {
            axisLabel: {
                color: '#dddddd',
                fontSize: 9
            },
            axisLine: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#28387d'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#192456'
                }
            },
            minInterval: 1
        },
        series: [{
            data: yObj,
            type: 'line',
            smooth: true,
            label: {
                normal: {
                    show: true,
                    fontSize: 9,
                    position: 'top'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    chartline2.setOption(option);
}