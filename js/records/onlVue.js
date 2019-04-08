

var numbersCode = 0
var settingDomType = true

new Vue({

    el: '#app',
    data: {
        ifMaskShow: false,
        // 基本组件
        elementData: [{
            name: "开关型",
            type: "switching"
        }, {
            name: "数值型",
            type: "number"
        }, {
            name: "复合型",
            type: "recombination"
        }],
        // 图表组件
        chartData: [{
            name: "折线图",
            type: "lineChart",
            show: false,
        }, {
            name: "柱状图",
        }, {
            name: "饼状图",
        }, {
            name: "伏压表",
            type: "solidgauge",
            show: false,
        }, {
            name: "半圆仪表",
        }, {
            name: "时钟",
        }, {
            name: "子弹图",
        },
        {
            name: "表格",
        }]
    },
    created: function () {
        console.log('a is: ' + this.a)
    },
    mounted() {
        this.onlGridstack()
        // 公共配置
        // $('.form-control-chosen').chosen({
        //     allow_single_deselect: true,
        //     width: '100%'
        // }).change(function(e,p){
        //     if(p.deselected){
        //         console.log('删除')
        //     }else{
        //         console.log('加入')
        //     }
        // });;
        //   $('.form-control-chosen-required').chosen({
        //     allow_single_deselect: false,
        //     width: '100%'
        //   });
        //   $('.form-control-chosen-search-threshold-100').chosen({
        //     allow_single_deselect: true,
        //     disable_search_threshold: 100,
        //     width: '100%'
        //   });
        //   $('.form-control-chosen-optgroup').chosen({
        //     width: '100%'
        //   });

        // $(function () {
        //     $('[title="clickable_optgroup"]').addClass('chosen-container-optgroup-clickable');
        // });


        //select选中
        // $('.form-control-chosen').on('change', function (e, params) {
        //         // console.log(params)
        // });
    },
    methods: {
        clickHideMask() {
            this.ifMaskShow = false
        },
        clickShowMask() {
            this.ifMaskShow = true
        },
        // 拖拽
        onlGridstack() {
            // var options = {
            //     cellHeight: 10,
            //     verticalMargin: 10,
            //     float: true,
            //     always_show_resize_handle: false,
            //     disableResize: false
            // };
            // console.log('1')
            // $('.grid-stack').gridstack(options);
            dragula([document.getElementById('dragulaDom')], {
                isContainer: function (el) {
                    return false; // only elements in drake.containers will be taken into account
                },
                moves: function (el, source, handle, sibling) {
                    return true; // elements are always draggable by default
                },
                accepts: function (el, target, source, sibling) {
                    return true; // elements can be dropped in any of the `containers` by default
                },
                invalid: function (el, handle) {
                    return false; // don't prevent any drags from initiating by default
                },
                direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
                copy: false,                       // elements are moved by default, not copied
                copySortSource: false,             // elements in copy-source containers can be reordered
                revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
                removeOnSpill: true,              // spilling will `.remove` the element, if this is true
                mirrorContainer: document.body,    // set the element that gets mirror elements appended
                ignoreInputTextSelection: true     // allows users to select input text, see details below
            });
        },
        // 添加组件事件
        clickPushCom(type) {
            var that = this
            let newNumber = numbersCode++
            var newNameId = 'swidch' + newNumber
            var newNumberId = 'number' + newNumber

            if (type === 'switching') {
                $('#dragulaDom').append(switchId(newNameId))


                that.jqClickSwitch(newNameId)

            } else if (type === 'number') {
                $('#dragulaDom').append(temperature(newNumberId))
                that.jqClickSwitch(newNumberId)
            } else if (type === 'recombination') {

                $('#dragulaDom').append(recombination())

            }

            layui.use('colorpicker', function () {
                var colorpicker = layui.colorpicker;
                //渲染
                colorpicker.render({
                    elem: '#switchIconSetting_options_body_color_elementId'
                    , color: '#c71585'
                    , predefine: true // 开启预定义颜色
                });
            });
            layui.use('form', function () {
                var form = layui.form;
                form.render()
            });
        },
        // 图表类增加
        clickChart(type, index) {
            var newNumber = numbersCode++
            var newlineChartId = 'newlinechart' + newNumber
            var newSolidgaugeId = 'solidgauge' + newNumber
            if (type === 'lineChart') {
                var show = this.chartData[index].show
                if (!show) {
                    $('#dragulaDom').append(HighchartsContainerSplineHtml(newlineChartId))
                    var chart_spline = HighchartsContainerSpline(newlineChartId)


                    this.jqClicksolidgaugeSeting(newlineChartId, { chart: chart_spline })
                    this.chartData[index].show = true
                } else {
                    layer.open({
                        title: '已经创建'
                        , content: '你已经创建过折线图'
                    });
                }
            } else if (type === 'solidgauge') {
                var show = this.chartData[index].show
                if (!show) {
                    $('#dragulaDom').append(HighchartsContainerSolidgaugeHtml(newSolidgaugeId))
                    HighchartsContainerSolidgauge()
                    this.jqClicksolidgaugeSeting(newSolidgaugeId)

                    this.chartData[index].show = true
                } else {
                    layer.open({
                        title: '已经创建'
                        , content: '你已经创建过折线图'
                    });
                }
            }


            layui.use('colorpicker', function () {
                var colorpicker = layui.colorpicker;
                //渲染
                colorpicker.render({
                    elem: '#switchIconSetting_options_body_color_elementId'
                    , color: '#c71585'
                    , predefine: true // 开启预定义颜色
                });
            });
            layui.use('form', function () {
                var form = layui.form;
                form.render()
            });
        },
        jqClickSwitch(newNameId) {
            var bodyName = `body #${newNameId} #swidchJs`
            $(bodyName).on('click', function () {
                var type = $(this).attr('data-type')
                if (type === 'yes') {
                    $(this).removeClass('switchCodeYes').addClass('switchCodeNo')
                    $(this).children('.solidSwitch').removeClass('solidSwitch').addClass('solidSwitchNo')
                    $(this).children('.switchCodeMsg ').addClass('switchCodeMsgNo').text('YES')
                    $(this).attr("data-type", "no");
                } else {
                    $(this).removeClass('switchCodeNo').addClass('switchCodeYes')
                    $(this).children('.solidSwitchNo').removeClass('solidSwitchNo').addClass('solidSwitch')
                    $(this).children('.switchCodeMsg ').removeClass('switchCodeMsgNo').text('NO')
                    $(this).attr("data-type", "yes");
                }
            })

            // 打开设置
            var settingDom = `body #${newNameId} .switchIconSetting`
            $(settingDom).on('click', function () {
                console.log(settingDomType)
                if (settingDomType) {
                    $(this).children('.switchIconSetting_tab').show()
                    settingDomType = false
                } else {
                    $(this).children('.switchIconSetting_tab').hide()
                    settingDomType = true
                }
            })

            // 编辑设置

            $(`body #${newNameId}  #edit`).on('click', function (event) {
                event.stopPropagation()
                $(`body #${newNameId}  #switchIconSetting_optionsDom`).show()
            })
            $(`body #${newNameId}  #switchIconSetting_optionsDom`).on('click', function (event) {
                event.stopPropagation()
            })
            $(`body #${newNameId}  .switchIconSetting_options_nav_cler`).on('click', function () {
                $(`body #${newNameId}  #switchIconSetting_optionsDom`).hide()

            })
        },
        // 压力图setting方法
        jqClicksolidgaugeSeting(newNameId, options) {
            console.log(options)
            // 打开设置
            var settingDom = `body #${newNameId} .lineChartBox_set`
            $(settingDom).on('click', function () {
                if (settingDomType) {
                    $(this).siblings('.switchIconSetting_tab').show()
                    settingDomType = false
                } else {
                    $(this).siblings('.switchIconSetting_tab').hide()
                    settingDomType = true
                }
            })

            $(`body #${newNameId}  #edit`).on('click', function (event) {
                event.stopPropagation()
                $(`body #${newNameId}  #switchIconSetting_optionsDom`).show()
            })


            $(`body #${newNameId}  .switchIconSetting_options_nav_cler`).on('click', function (event) {
                event.stopPropagation()
                $(`body #${newNameId}  #switchIconSetting_optionsDom`).hide()
            })
            $('.form-control-chosen').chosen({
                allow_single_deselect: true,
                width: '100%'
            }).change(function (e, p) {
                console.log(p)
                if (p.deselected) {
                    console.log('删除')
                } else {
                    console.log('加入')

                    var arr = [];
                    for (var i = 0; i < 12; i++) {
                        var arrNum = parseInt(Math.random() * 30) + 1;
                        var flag = true;
                        for (var j = 0; j <= arr.length; j++) {
                            if (arrNum == arr[j]) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            arr.push(arrNum);
                        } else {
                            i--;
                        }
                    }
                    options.chart.addSeries({
                        name: p.selected,
                        data: arr
                    });
                }
            });;

            // $(`body #${newNameId} #switchIconSetting_optionsDom`).show()
        }
        //把PUSH到拖拽的方法封装
        // newthisAddGrig(options){
        //     return new Promise((resove,reject)=>{
        //         new function () {
        //             this.grid = $('.grid-stack').data('gridstack');
        //             this.add_new_widget = function () {
        //                 var node = {
        //                     x: 11 * Math.random(),
        //                     y: 5 * Math.random(),
        //                     width: options.width,
        //                     height:options.height
        //                 };
        //                 this.grid.add_widget($(`<div " class="grid-stack-item"   data-gs-width="4" data-gs-height="8">${options.template}</div>`),
        //                     node.x, node.y, node.width, node.height);
        //             }.bind(this);
        //             this.add_new_widget()
        //             resove()
        //         };
        //     })

        // }
    },
})
// }
