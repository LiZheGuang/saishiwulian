

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
        console.log(Highcharts)
        HighchartsContainerSolidgauge()
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
            console.log(type)
            if (type === 'lineChart') {
                var show = this.chartData[index].show
                console.log(show)
                if (!show) {
                    $('#dragulaDom').append(HighchartsContainerSplineHtml(''))
                    HighchartsContainerSpline()


                    this.chartData[index].show = true
                } else {
                    layer.open({
                        title: '已经创建'
                        , content: '你已经创建过折线图'
                    });
                }

            }
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
