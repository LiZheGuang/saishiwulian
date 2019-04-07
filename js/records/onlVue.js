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
            type:"lineChart",
            show:false,
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
            var options = {
                cellHeight: 10,
                verticalMargin: 10,
                float: true,
                always_show_resize_handle: false,
                disableResize: false
            };
            console.log('1')
            $('.grid-stack').gridstack(options);
        },
        // 添加组件事件
        clickPushCom(type) {
            var that = this
            var newNameId = 'swidch' + numbersCode++

            if (type === 'switching') {
                new function () {
                    this.grid = $('.grid-stack').data('gridstack');
                    this.add_new_widget = function () {
                        var node = {
                            x: 12 * Math.random(),
                            y: 5 * Math.random(),
                            width: 4,
                            height: 8
                        };
                        this.grid.add_widget($(`<div id="" class="grid-stack-item"  data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="8">${switchId(newNameId)}</div>`),
                            node.x, node.y, node.width, node.height);
                    }.bind(this);
                    this.add_new_widget()
                    that.jqClickSwitch(newNameId)

                };
            } else if (type === 'number') {
                new function () {
                    this.grid = $('.grid-stack').data('gridstack');
                    this.add_new_widget = function () {
                        var node = {
                            x: 11 * Math.random(),
                            y: 5 * Math.random(),
                            width: 4,
                            height: 8
                        };
                        this.grid.add_widget($(`<div " class="grid-stack-item">${temperature()}</div>`),
                            node.x, node.y, node.width, node.height);
                    }.bind(this);
                    this.add_new_widget()
                    // that.jqClickSwitch(newNameId)

                };
            }else if(type === 'recombination'){
                var options = {
                    width:4,
                    height:13,
                    template:recombination()
                }
                this.newthisAddGrig(options)
            }
        },
        // 图表类增加
        clickChart(type,index){
            console.log(type)
            if(type ==='lineChart'){
                var show = this.chartData[index].show
                console.log(show)
                if(!show){
                    console.log('还是满足？')
                    var options = {
                        width:7,
                        height:22,
                        template:HighchartsContainerSplineHtml()
                    }
                    this.newthisAddGrig(options).then(()=>{
                            HighchartsContainerSpline()
                    })
                    this.chartData[index].show = true
                }else{
                    layer.open({
                        title: '已经创建'
                        ,content: '你已经创建过折线图'
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
            $(settingDom).on('click',function(){
                    console.log(settingDomType)
                if(settingDomType){
                    $(this).children('.switchIconSetting_tab').show()
                    settingDomType = false
                }else{
                    $(this).children('.switchIconSetting_tab').hide()
                    settingDomType = true
                }
            })

        },
        //把PUSH到拖拽的方法封装
        newthisAddGrig(options){
            return new Promise((resove,reject)=>{
                new function () {
                    this.grid = $('.grid-stack').data('gridstack');
                    this.add_new_widget = function () {
                        var node = {
                            x: 11 * Math.random(),
                            y: 5 * Math.random(),
                            width: options.width,
                            height:options.height
                        };
                        this.grid.add_widget($(`<div " class="grid-stack-item"   data-gs-width="4" data-gs-height="8">${options.template}</div>`),
                            node.x, node.y, node.width, node.height);
                    }.bind(this);
                    this.add_new_widget()
                    resove()
                };
            })
        
        }
    },
})
