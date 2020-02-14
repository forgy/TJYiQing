$(function() {
    // 获取当前时间
    //getCurrDate();
    // getVVCount();
    // getPeopleData();
    getChartsInfo();
    var chart = echarts.init(document.getElementById('riskMap'));
    drawMap();
    var Max = 0;
    initData();

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
                textStyle: {
                    color: '#7B93A7'
                },
                inRange: {
                    color: ['#E2EBFF','#FFEFD6', '#FFD2A0', '#FF8628','#E64B47']
                }
            },
            tooltip: {
                trigger: 'item',
                enterable: true,
                formatter: function(params) {
                    // console.log('--------')
                    console.log(params)
                    var _text = '<div id="seeMore" ><p>' + params.data.name + ':' + params.data.value + '例</p>' +
                        '</div>'
                    return _text
                }
            },
            series: {
                type: 'map',
                map: 'tianjin',
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
            echarts.registerMap('tianjin', data);
            initData();
        });
    }

    function getChartsInfo() {
        $.getJSON('https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=%E5%A4%A9%E6%B4%A5', function(data) {
            var linexData1 = [];
            var lineyData1 = [];
            var lineyData12 = [];
            var lineyData13 = [];
            var lineyData2 = [];
            for(var i = 0; i < data.data.length;i++){

                linexData1.push(data.data[i].date);
                lineyData1.push(data.data[i].confirm);
                lineyData12.push(data.data[i].heal);
                lineyData13.push(data.data[i].dead);
                lineyData2.push(data.data[i].confirm_add);
            }

            document.getElementById("numXz").innerHTML = data.data[data.data.length-1].confirm_add;
            document.getElementById("numLj").innerHTML = data.data[data.data.length-1].confirm;
            document.getElementById("numZy").innerHTML = data.data[data.data.length-1].heal;
            document.getElementById("numSw").innerHTML = data.data[data.data.length-1].dead;

            getChartsLineOne(linexData1, lineyData1,lineyData12,lineyData13);
            getChartsLineTwo(linexData1, lineyData2);
        })
    }

    function initData() {
        $.getJSON('https://tianqiapi.com/api?version=epidemic&appid=45796951&appsecret=REJgCm9M', function(data) {
            // document.getElementById("todayTime").innerHTML ="统计时间截至："+data.data.date;
            $("#todayTime").text("统计时间截至："+data.data.date);
            for(var i = 0; i <data.data.area.length;i++ ){
                var province = data.data.area[i];
                if(province.provinceName.indexOf("天津") >= 0){
                    var bar1Data ={
                        xData: [],
                        yData: []
                    };

                    var tabel = "";
                    var arr = [];
                    var datas = [];
                    for (var m = 0; m < province.cities.length; m++) {
                        datas.push({
                            name:province.cities[m].cityName,
                            value:province.cities[m].confirmedCount
                        });
                        arr.push(province.cities[m].confirmedCount);
                        bar1Data.xData.push(province.cities[m].cityName);
                        bar1Data.yData.push(province.cities[m].confirmedCount);

                        tabel +=      '<tr data-v-dfa5e01e="">'+
                            '<th data-v-dfa5e01e="" class=""><span data-v-dfa5e01e="">'+province.cities[m].cityName+'</span></th>'+
                            // '<td data-v-dfa5e01e="">'+province.cities[m].suspectedCount+'</td>'+
                            '<td data-v-dfa5e01e="">'+province.cities[m].confirmedCount+'</td>'+
                            '<td data-v-dfa5e01e="">'+province.cities[m].curedCount+'</td>'+
                            '<td data-v-dfa5e01e="">'+province.cities[m].deadCount+'</td>'+
                            '</tr>';
                    }

                    document.getElementById("cityBody").innerHTML = tabel;
                    Max = arr.sort(function(a, b) {
                        return b - a;
                    })[0];
                    //绘制地图
                    renderMap('tianjin', datas, Max);
                    getChartsBarOne(bar1Data.xData, bar1Data.yData);
                    break;
                }
            }
        })
    }
})

function seeDeatils(e, name, val) {
    console.log(name)
    console.log(val)
    window.location.href = "https://wxyq.nbsghy.com/detail.html?name=" + name + ""
}