var seeting = {


}

// 开关
function switchId(keyID) {

   return  `<div class="dragulaDomClass clearfix" id="${keyID}" >
                <div class="switchingBox clearfix">
                    <div class="switchingBox_title">1#电动机</div>
                    <div id="swidchJs" data-type="yes" class="switchCode  switchCodeYes">
                        <div class="solidSwitch"></div>
                        <div class="switchCodeMsg ">NO</div>
                    </div>
                    <div class="switchIcon"></div>
                    <div class="switchIconSetting">
                        <!-- 设置 -->
                        <div class="switchIconSetting_tab">
                            <div class="switchIconSetting_tab_item" id="edit">编辑属性</div>
                            <div class="switchIconSetting_tab_item" id="copy">复制</div>
                            <div class="switchIconSetting_tab_item" id="suoding">锁定</div>
                            <div class="switchIconSetting_tab_item" id="delete">删除</div>
                        </div>
                        <!-- 设置 -->
                        <div class="switchIconSetting_options" id="switchIconSetting_optionsDom" hidden>
                        <div class="switchIconSetting_options_nav">
                            <!-- 组件选项开关模块 -->
                            <div>组件选项开关模块</div>
                            <div class="switchIconSetting_options_nav_cler">关闭</div>
                        </div>
    
                        <div class="switchIconSetting_options_body">
                            <div class="switchIconSetting_options_body_color layui-form">
                                <p>颜色</p>
                                <div id="switchIconSetting_options_body_color_elementId">
                                    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                                        <legend>预定义颜色项</legend>
                                    </fieldset>
                                </div>
                                <p>标题</p>
                                <div class="layui-form-item">
                                    <input type="text" name="title" required lay-verify="required" placeholder="请输入标题"
                                        autocomplete="off" class="layui-input">
                                </div>
    
                                <p>数据绑定</p>
                                <div class=" layui-form-item">
                                    <div class="layui-input-inline">
                                        <select name="quiz2">
                                            <option value="">请选择市</option>
                                            <option value="杭州">杭州</option>
                                            <option value="宁波" disabled="">宁波</option>
                                            <option value="温州">温州</option>
                                            <option value="温州">台州</option>
                                            <option value="温州">绍兴</option>
                                        </select>
                                    </div>
                                </div>
                                <p>开关样式</p>
                                <div class="layui-form-item">
    
                                    <input type="radio" name="sex" value="男" title="样式一" checked="">
                                    <input type="radio" name="sex" value="女" title="样式二">
                                    <input type="radio" name="sex" value="女" title="样式三">
                                </div>
    
                                <p>图标</p>
    
                                <div class="switchIconSetting_options_icon">
                                    <span class="iconColor">请选择数据点图标</span>
                                    <div class="click_switchIconSetting_options_icon_box">
                                        <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                            alt="选择图片">
                                        <!-- 点击后的展示 -->
                                        <div class="click_switchIconSetting_options_icon_show">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
                                            <img class="click_switchIconSetting_options_icon" src="./images/icon_wd.png"
                                                alt="选择图片">
    
                                        </div>
                                        <!-- 点击后的展示 -->
    
                                    </div>
                                </div>
    
                            </div>
                            <!-- 显示选项 -->
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                `
}

// 温度传感器
function temperature() {
    return `
    <div class="dragulaDomClass clearfix">
        <div class="switchingBox clearfix">
            <div class="switchingBox_title">温度传感器</div>
            <div class="wenduchuangan">58.6°C</div>
            <div class="switchIcon"></div>
            <div class="switchIconSetting"></div>
        </div>
    </div>`
}

// 复合
function recombination() {
    return `<div class="dragulaDomClass clearfix" >
    <div class="recombination">
        <div class="recombination_t">
            <div class="recombination_t_Msg">
                <p>220 V</p>
                <p>220 V</p>
                <p>220 V</p>
            </div>
            <div class="switchIcon recombinationIcon"></div>
            <div class="switchIconMsg">最后更新：12:01 30s</div>
            <div class="switchIconSetting"></div>
        </div>
        <div class="recombination_b">
            三相电压表
        </div>
    </div>
</div>`
}

// 折线图html
function HighchartsContainerSplineHtml() {
    return `
    <div class="dragulaDomClass clearfix" >
    <div class="lineChartBox">
        <div class="lineChartBox_title">
            1#机组温度监控
        </div>
        <div id="container" style="min-width:400px;height:400px"></div>
    </div>
</div>
    `
}

function HighchartsContainerSpline() {
    console.log('执行了')
    var chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: '机组温度监控'
        },
        subtitle: {
            text: '数据来源: WorldClimate.com'
        },
        xAxis: {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            title: {
                text: '气温 (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    // 开启数据标签
                    enabled: true
                },
                // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                enableMouseTracking: false
            }
        },
        series: [{
            name: '水温',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '模温',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });


}