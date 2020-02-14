$(function() {
    // 获取当前时间
    //getCurrDate();
    getMapData();
    function renderMap(map, data, max) {
        //初始化绘制地图配置
        var options = {
            title: {
                show: false,
                left: 'center',
                padding: 5,
                textStyle: {
                    color: '#1d59b6',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei",
                },
            },
            //图例
            visualMap: {
                show: false,
                min: 0,
                max: max,
                bottom: 50,
                realtime: false,
                // text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                // seriesIndex: [1],
                textStyle: {
                    color: '#7B93A7'
                },
                inRange: {
                    color: ['#fff7f5', '#ff9f8c', '#ff3b07']
                }
            },
            tooltip: {
                trigger: 'item',
                enterable: true,
                // transitionDuration: 1,
                // formatter: '{b}<br/>确诊{c}例'
                formatter: function(params) {
                    // console.log('--------')
                    console.log(params)
                    var _text = '<div id="seeMore" ><p>' + params.data.name + ':' + params.data.value + '例</p>' +
                        '<div style="width: 40px;margin: 0 auto;"onclick="seeDeatils(event,\'' +
                        params.data.name + '\',' + params.data.value + ')">详情></div></div>'
                    return _text
                }
            },

            series: {
                type: 'map',
                map: 'ningbo',
                //geoIndex: 0,
                zoom: 1.15, //当前视角的缩放比例。
                aspectScale: 0.95, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#000',
                            fontSize: 8,
                            fontWeight: 'normal',
                            fontFamily: "Microsoft YaHei",
                        }
                    },
                    // emphasis: {
                    //     show: false,
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    // }
                },
                // roam: false,
                itemStyle: {
                    normal: {
                        // areaColor: '#031525',
                        // borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#f7ff9d'
                    }
                },
                animation: false,
                data: data
            },
        };
        //渲染地图
        chart.setOption(options);
    }

    function drawMap() {
        //绘制地图
        $.getJSON('data/tianjin.json', function(data) {
            d = [];
            for (var i = 0; i < data.features.length; i++) {
                d.push({
                    name: data.features[i].properties.name
                })
            }
            mapdata = d;
            //注册地图
            echarts.registerMap('ningbo', data);
            $.getJSON('data/mockData.json?randomNum=' + Math.random(), function(data) {
                console.log(data)
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i].value)
                }
                Max = arr.sort(function(a, b) {
                    return b - a;
                })[0];
                //绘制地图
                renderMap('ningbo', data, Max);
            });
        });
    }

    // $(document).on('click', '#seeMore', function(e) {
    //     console.log(888888888888)
    //     e.stopPropagation();
    //   })

    //获取当前时间
    function getCurrDate() {
        var dateObj = new Date(); //表示当前系统时间的Date对象 
        var year = dateObj.getFullYear(); //当前系统时间的完整年份值
        var month = dateObj.getMonth() + 1; //当前系统时间的月份值 
        var date = dateObj.getDate(); //当前系统时间的月份中的日

        var hour = dateObj.getHours(); //当前系统时间的小时值 
        var minute = dateObj.getMinutes(); //当前系统时间的分钟值
        var second = dateObj.getSeconds(); //当前系统时间的秒钟值

        //如果月、日、小时、分、秒的值小于10，在前面补0
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }

        var currDate = '数据截至' + year + '年' + month + '月' + date + '日' + hour + '时';
        $('#todayTime').html(currDate)
        setTimeout(() => {
            getCurrDate();
        }, 1000 * 10);
    }

    // 获取头部数据
    function getMapData() {
        $.getJSON('data/detail.json', function(data) {
            var ddd = data.detail.data;
            for(var i = 0; i <ddd.length;i++ ){


            }
            $('#qzrs').html(data[0].rs);
            $('#qzrs-zr').html(data[0].zr);
            $('#swrs').html(data[1].rs);
            $('#swrs-zr').html(data[1].zr);
            $('#zyrs').html(data[2].rs);
            $('#zyrs-zr').html(data[2].zr);
            $('#mqjc').html(data[3].rs);
            $('#mqjc-zr').html(data[3].zr);
        })
    }

    function getChartsInfo() {
        $.getJSON('data/chartMock.json', function(val) {
            var data = val[0];
            var xData = data.bar01.xData;
            var yData = data.bar01.yData;
            var barxData2 = data.pie01.leg;
            var baryData2 = data.pie01.yData;

            var linexData1 = data.line01.xData;
            var lineyData1 = data.line01.yData;

            var linexData2 = data.line02.xData;
            var lineyData2 = data.line02.yData;

            var linexData3 = data.line03.xData;
            var lineyData3 = data.line03.yData;

            var linexData4 = data.line04.xData;
            var lineyData4 = data.line04.yData;

            getChartsBarOne(xData, yData);
            getChartsBarTwo(barxData2, baryData2);
            getChartsLineOne(linexData1, lineyData1);
            getChartsLineTwo(linexData2, lineyData2);
            getChartsLineThree(linexData3, lineyData3);
            getChartsLineFour(linexData4, lineyData4);
            // getChartsPieOne(pieLeg, pieYData);


        })
    }

    function getVVCount() {
        var time = new Date();
        var param = time.getTime();
        $.ajax({
            type: "POST", //提交方式 
            url: "https://wxyq.nbsghy.com/nbmapservice/api/Log/GetVV", //路径 
            data: {
                t: param
            }, //数据，这里使用的是Json格式进行传输 
            success: function(result) { //返回数据根据结果进行相应的处理 
                // if (result.Action) {
                //     let currDate = result.Action + '人次已浏览';
                //     $('#visitCount').html(currDate);
                // }
            },
            error: function(err) {
                console.log('错误', err);
            }
        })
    }

})

function seeDeatils(e, name, val) {
    console.log(name)
    console.log(val)
    window.location.href = "https://wxyq.nbsghy.com/detail.html?name=" + name + ""
}