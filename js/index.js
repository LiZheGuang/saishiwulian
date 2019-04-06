/************** 公共 **************/
/******************************************************* 公共模拟滚动条 *******************************************************/
(function($){
	$(window).on("load",function(){
		$("#net-nav").mCustomScrollbar({
			theme:"dark",
			updateOnSelectorChange:true,
		});
	});
})(jQuery);
/**********************************载入相关模块********************************************/
var element;
var layer;
var form;
layui.use(['element', 'layer', 'form', 'laydate'], function()
{
	element = layui.element;
	layer   = layui.layer;
	form    = layui.form;
	var laydate = layui.laydate;
	//初始化日期选择
	laydate.render(
	{
		elem:'#data'
		,range:true
	});
});
/**********************************程序控制 ********************************************/
$(function()
{
	//分组展开与关闭
	$(document).on("click", ".net-tab-down", function()
	{
		if($(this).hasClass("net-tab-up"))
		{
			$(this).removeClass("net-tab-up");
			$(this).parents(".net-tab-group").next(".net-tab-son").addClass("net-tab-none");
		}else
		{
			$(this).addClass("net-tab-up");
			$(this).parents(".net-tab-group").next(".net-tab-son").removeClass("net-tab-none");
		}
	})
	//分组名称修改
	$(document).on("click", ".net-tab-addname", function()
	{
		var cla  = $(this).siblings(".net-tab-name");
		var name = $(this).siblings(".net-tab-name").attr("name");
		layer.prompt(
		{
			formType:0,
			shadeClose:true,
			value:name,
			title:'修改名称',
		},function(value,index,elem)
		{
			if(value != "")
			{
				cla.attr("name",value);
				cla.html(value);
				layer.close(index);//手动关闭弹窗
			}else{
				layer.msg('分组名称不能为空',{offset:'t',anim:6});
			}
		});
	})
	//分组删除
	$(document).on("click", ".net-tab-del", function()
	{
		var cla = $(this).parents(".net-tab-group").next(".net-tab-son").children("tr").length;
		console.log(cla);
		if(cla == 0){
			$(this).parents(".net-tab-group").next(".net-tab-son").remove();
			$(this).parents(".net-tab-group").remove();
		}else{
			layer.msg('分组存在设备！',{offset:'t',anim:6});
		}
	})
	//自定义标签
	$(document).on("click", ".net-tab-custom", function()
	{
		var cla  = $(this);
		var name = $(this).attr("name");
		layer.prompt(
		{
			formType:0,
			shadeClose:true,
			value:name,
			title:'修改自定义标签',
		},function(value,index,elem)
		{
			if(value != "")
			{
				cla.attr("name",value);
				cla.html(value);
				layer.close(index);//手动关闭弹窗
			}else{
				layer.msg('自定义标签不能为空',{offset:'t',anim:6});
			}
		});
	})
	//实时曲线
	/*************************************** 实时数据 ************************************/
	$(document).on("click", ".net-td-realTime", function()
	{
		var sid = $(this).attr("sid");//获取设备ID
		var cid = $(this).attr("cid");//获取传感器ID
		layer.open(
		{
			type:1 
			,title:'实时数据-传感器'
			,area:['900px','600px']
			,shade:0
			,skin:'net-layui'
			,maxmin:true
			,zIndex:layer.zIndex
			,content:'<div class="groupAdmin">'+
						'<iframe src="highcharts.html" scrolling="no" frameborder="0"></iframe>'+
					'</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				layer.setTop(layero);//点击置顶
			}
			,cancel:function(index, layero, id)//关闭后回调
			{ 

			}
			,resizing:function(layero)//弹窗改变大小后
			{
				
				
			}
			,full:function(layero)
			{
				
				
			}
			,restore:function(layero)
			{
				
				
			}
		});
	})
	/*************************************** 历史数据弹窗 ************************************/
	$(document).on("click", ".net-td-History", function()
	{
		var sid = $(this).attr("sid");//获取设备ID
		var cid = $(this).attr("cid");//获取传感器ID
		layer.open(
		{
			type:1 
			,title:'历史数据'
			,area:['1200px','100%']
			,offset:'rt'
			,skin:'net-layui'
			,scrollbar:true
			,maxmin:true
			,content:'<div class="groupAdmin">'+
						'<div class="net-History-echart">'+
							'<div class="net-History-title">'+
								'<span>历史曲线</span><a href="javascript:;" class="net-History-a net-History-b">1H</a><a href="javascript:;" class="net-History-a">1D</a><a href="javascript:;" class="net-History-a">2月</a><a href="javascript:;" class="net-History-a">3月</a>'+
							'</div>'+
							'<div class="net-History-echart-con">'+
								'<iframe src="highcharts.html" scrolling="no" frameborder="0"></iframe>'+
							'</div>'+
						'</div>'+
						'<div class="net-History-new">'+
							'<div class="net-History-title">'+
								'<span>传感器信息</span>'+
							'</div>'+
							'<div class="net-History-echart-con">'+
								'<div class="net-History-newList">'+
									'当前值:'+
								'</div>'+
								'<div class="net-History-newList">'+
									'设备名称:'+
								'</div>'+
								'<div class="net-History-newList">'+
									'传感器名称:'+
								'</div>'+
								'<div class="net-History-newList">'+
									'类型:'+
								'</div>'+
								'<div class="net-History-newList">'+
									'当前状态:'+
								'</div>'+
								'<div class="net-History-newList">'+
									'更新时间:'+
								'</div>'+
								'<div class="net-History-newbtn">'+
									'<a href="触发器.html" class="layui-btn layui-btn-primary">'+
										'添加触发器'+
									'</a>'+
									'<a href="添加设备.html" class="layui-btn layui-btn-primary">'+
										'编辑设备'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="net-History-tab">'+
							'<div class="net-History-title">'+
								'<span>数据列表</span>'+
								'<div class="net-con-headS">'+
									'<input type="text" name="title" placeholder="选择时间" id="data" class="layui-input" readonly>'+
								'</div>'+
								'<a href="javascript:;" class="layui-btn layui-btn-danger">'+
									'搜索'+
								'</a>'+
							'</div>'+
							'<div class="net-History-tabCon">'+
								'<table class="net-History-tabble">'+
									'<thead>'+
										'<tr>'+
											'<td>数据</td>'+
											'<td>时间</td>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
										'<tr>'+
											'<td>3.000</td>'+
											'<td>2019-03-28 16:49:48</td>'+
										'</tr>'+
									'</tbody>'+
								'</table>'+
							'</div>'+
							'<div class="net-History-tab-page">'+
								'<a href="javascript:;">'+
									'首页'+
								'</a>'+
								'<a href="javascript:;">'+
									'上一页'+
								'</a>'+
								'<a href="javascript:;" class="pageY">'+
									'1'+
								'</a>'+
								'<a href="javascript:;">'+
									'2'+
								'</a>'+
								'<a href="javascript:;">'+
									'3'+
								'</a>'+
								'<a href="javascript:;">'+
									'下一页'+
								'</a>'+
								'<a href="javascript:;">'+
									'尾页'+
								'</a>'+
							'</div>'+
						'</div>'+
					'</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				//初始化日期选择
				layui.use(['laydate'], function()
				{
					laydate = layui.laydate;
					laydate.render(
					{
						elem:'#data'
						,range:true
					});
				});
			}
			,cancel:function(index, layero, id)//关闭后回调
			{ 

			}
			,resizing:function(layero)//弹窗改变大小后
			{
				
			}
			,full:function(layero)
			{
				
			}
			,restore:function(layero)
			{
				
				
			}
		});
	})
	//历史曲线时间切换
	$(document).on("click", ".net-History-a", function()
	{
		if(!$(this).hasClass("net-History-b"))
		{
			$(".net-History-b").removeClass("net-History-b");
			$(this).addClass("net-History-b");
		}
	})
	//更多操作-设置弹窗
	$(document).on("click", ".net-td-set", function(e)
	{
			var clas = $(this).parent("td").parent("tr");
			mouseNetPopupDele();
			clas.addClass("set");
			mouseNetPopup(clas,e);
	})
	//更多操作-上移一行
	$(document).on("click", "#netPopupTo", function(e)
	{
		if(!$(this).hasClass("netPopupDrop"))
		{
			var tem = $(".set").clone(true);
			var add = tem.removeClass("set");
			$(".set").prev("tr").before(add);
			$(".set").remove();
			mouseNetPopupDele();
		}
	})
	//更多操作-下移一行
	$(document).on("click", "#netPopupBo", function(e)
	{
		if(!$(this).hasClass("netPopupDrop"))
		{
			var tem = $(".set").clone(true);
			var add = tem.removeClass("set");
			$(".set").next("tr").after(add);
			$(".set").remove();
			mouseNetPopupDele();
		}
	})
	//更多操作-删除
	$(document).on("click", "#netPopupDe", function(e)
	{
		if(!$(this).hasClass("netPopupDrop"))
		{
			layer.confirm('删除后不可恢复,是否删除？',
			{
				btn:['确定','取消']
			},function(index)//确定按钮回调
			{
				$(".set").remove();
				mouseNetPopupDele();
				layer.close(index);//手动关闭弹窗
			},function()//取消按钮回调
			{
			 
			});
		}
	})
	//更多操作-移动到展开
	$(document).on("mouseenter", "#netPopupTe", function()
	{
		$("#netPopupR").show();
		var cla = $(".set").parent(".net-tab-son").attr("id");
		$("."+cla).addClass("netPopupDrop");
	})
	//更多操作-移动到关闭
	$(document).on("mouseleave", "#netPopupTe", function()
	{
		$("#netPopupR").hide();
	})
	//更多操作-移动
	$(document).on("click", "#netPopupR p", function()
	{
		
		if(!$(this).hasClass("netPopupDrop"))
		{
			var id = $(this).attr("class");
			var tem = $(".set").clone(true);
			var add = tem.removeClass("set");
			$(".set").remove();
			$("#"+id).append(add);
			mouseNetPopupDele();//删除弹窗
		}
	})
	//******* 监听上报周期 ********//
	layui.use(['form'], function()
	{
		var iform    = layui.form;
		iform.on('radio(cycle)',function(data)
		{
			var val = data.value;
			if(val == 1)
			{
				$("#Recommend").addClass("net-form-block");
				$("#custom").removeClass("net-form-block");
			}else if(val == 0)
			{
				$("#custom").addClass("net-form-block");
				$("#Recommend").removeClass("net-form-block");
			}
		});
	});	
	/**** 添加节点  ****/
	$(document).on("click", "#addNode", function()
	{
		var tem = 
				'<div class="net-form-tr">'+
					'<div class="net-form-td">'+
						'<input type="text" name="title" class="layui-input">'+
					'</div>'+
					'<div class="net-form-td">'+
						'<select class="proj-titleSelect" name="interest" lay-filter="required" lay-search="">'+
						'<option value=""></option>'+
						'<option value="0">下拉1</option>'+
						'<option value="1">下拉2</option>'+
						'<option value="2">下拉3</option>'+
					'</select>'+
					'</div>'+
					'<div class="net-form-td">'+
						'<select class="proj-titleSelect" name="interest" lay-filter="required" lay-search="">'+
						'<option value=""></option>'+
						'<option value="0">下拉1</option>'+
						'<option value="1">下拉2</option>'+
						'<option value="2">下拉3</option>'+
					'</select>'+
					'</div>'+
					'<div class="net-form-td">'+
						'<input type="text" name="title" class="layui-input">'+
					'</div>'+
					'<div class="net-form-td">'+
						'<input type="text" name="title" class="layui-input">'+
					'</div>'+
					'<div class="net-form-td">'+
						'<img src="images/DOC图标.png" class="net-form-img">'+
					'</div>'+
					'<div class="net-form-td">'+
						'<a href="javascript:;" class="net-form-a">'+
							'删除'+
						'</a>'+
					'</div>'+
				'</div>';
		$("#ReceiveNode").append(tem);
		form.render();//数据加载完毕更新渲染		
	})
	/**** 批量添加节点  ****/
	$(document).on("click", "#batchAddNode", function()
	{
		layer.open(
		{
			type:1 
			,title:'批量添加节点'
			,area:['400px','360px']
			,maxmin:true
			,btn:['确定', '取消']
			,content:'<div class="layui-form NodeDiv">'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'数量'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="5" name="title" class="layui-input" id="NodeS">'+
							'</div>'+
						'</div>'+
						
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'前缀'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="传感器-" name="title" class="layui-input" id="NodeQ">'+
							'</div>'+
						'</div>'+
						
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'类型'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<select name="name1" lay-filter="lei" id="NodeL">'+
									'<option value="0">数值型</option>'+
									'<option value="1">开关型</option>'+
									'<option value="2">定位型</option>'+
								'</select>'+
							'</div>'+
						'</div>'+
						
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'有效位数'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<select name="name2" lay-filter="dan" id="NodeY">'+
									'<option value="0">0(小数位)</option>'+
									'<option value="1">1(小数位)</option>'+
									'<option value="2">2(小数位)</option>'+
									'<option value="3">3(小数位)</option>'+
									'<option value="4">4(小数位)</option>'+
								'</select>'+
							'</div>'+
						'</div>'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'单位'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="℃" name="title" class="layui-input" id="NodeD">'+
							'</div>'+
						'</div>'+
					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				form.render();//数据加载完毕更新渲染
			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				var shu = $("#NodeS").val();//数量
				var qia = $("#NodeQ").val();//前缀
				var lei = $("#NodeL").val();//类型
				var wei = $("#NodeY").val();//有效位数
				var dan = $("#NodeD").val();//单位
				var num = $(".net-form-tr").length;//存在数量
				if(shu >= 0 && shu){
					for(var a=0;a<shu;a++)
					{
						var min = a+num+1;
						Node(min,qia,lei,wei,dan,);
						if((a+1) == shu){
							form.render();//数据加载完毕更新渲染
							layer.close(index);//手动关闭弹窗
						}
					}
				}else{
					layer.msg('数量不能为空！');
				}
			}
		});
	})
	/**** 更换图标弹窗  ****/
	$(document).on("click", ".net-form-img", function()
	{
		if(!$(this).hasClass("net-form-imgH"))
		{
			$(this).addClass("net-form-imgH");
			layer.open(
			{
				type:1 
				,title:'更换图标'
				,area:['800px','600px']
				,maxmin:true
				,content:'<div class="net-geng-img" src="images/DOC图标.png"><img src="images/DOC图标.png" /></div><div class="net-geng-img" src="images/PPT图标.png"><img src="images/PPT图标.png" /></div>'
				,success:function(layero,index)//弹出层成功后回调
				{

				}
				,cancel:function(index, layero)
				{ 
					$(".net-form-imgH").removeClass("net-form-imgH");
				}
			});
		}
	})
	/**** 更换图标  ****/
	$(document).on("click", ".net-geng-img", function()
	{
		var src= $(this).attr("src");
		$(".net-form-imgH").attr("src",src);
		$(".net-form-imgH").removeClass("net-form-imgH");
		layer.closeAll();//关闭层
		
	})
	/** 监听选择协议和修改协议标签 **/
	layui.use(['form'], function()
	{
		var iform    = layui.form;
		//选择协议
		iform.on('select(xieyi)',function(data)
		{
			var val = data.value;
			if(val == 0)
			{
				$(".net-linkShow").removeClass("net-linkShow");
				$("#net-linkTCP").addClass("net-linkShow");
			}else if(val == 1)
			{
				$(".net-linkShow").removeClass("net-linkShow");
				$("#net-linkMB").addClass("net-linkShow");
			}else if(val == 2)
			{
				$(".net-linkShow").removeClass("net-linkShow");
				$("#net-linkMQTT").addClass("net-linkShow");
			}
		});
		//选择编辑协议标签方式
		iform.on('select(biaoqian)',function(data)
		{
			var val = data.value;
			if(val == 0)
			{
				$(".show-Agreement").removeClass("show-Agreement");
				$("#xiugai-Agreement").addClass("show-Agreement");
			}else if(val == 1)
			{
				$(".show-Agreement").removeClass("show-Agreement");
				$("#yiyou-Agreement").addClass("show-Agreement");
			}
		});
		//监听发送方式
		iform.on('radio(fasongfangshi)',function(data)
		{
			var val = data.value;
			if(val == 0)
			{
				$("#zhou-Agreement").hide();
			}else if(val == 1)
			{
				$("#zhou-Agreement").css("display","inline-block");
			}
		});
	});
	/*** 接受指令 ***/
	$(document).on("click", ".ReceiveInstruction", function()
	{
		layer.open(
		{
			type:1 
			,title:'接收指令'
			,area:['800px','800px']
			,maxmin:true
			,btn:['清空日志', '取消']
			,content:'<div class="net-linkJournal" id="net-linkJournal">'+
						'<p>'+
							'2019-04-01 22:44:52: 454545'+
						'</p>'+
						'<p>'+
							'2019-04-01 22:44:52: 454545'+
						'</p>'+
					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{

			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				$("#net-linkJournal p").remove();
			}
		});
	})
	/** 编辑协议 **/
	$(document).on("click", "#Agreement-edit", function()
	{
		var tem = 
				'<span class="span-Agreement">'+
					'[H:'+
					'<input type="text" name="title" class="input-Agreement">'+
					']'+
					'<a href="javascript:;" class="layui-icon icon-Agreement">'+
						'&#xe640;'+
					'</a>'+
				'</span>';
		$("#Agreement-Receive").html(tem);		
	})
	/*** 添加协议 ***/
	$(document).on("click", ".add-Agreement", function()
	{
		var aid    = $(this).attr("aid");
		var arraid = [aid].toString().split(',');
		Agreement("D",arraid);
		
	})
	/*** 批量添加协议弹窗 ***/
	$(document).on("click", "#Padd-Agreement", function()
	{
		layer.open(
		{
			type:1 
			,title:'批量添加协议'
			,area:['1000px','80%']
			,maxmin:true
			,btn:['确定', '取消']
			,content:'<div class="net-linkJournal">'+
						'<div class="update-Agreement">'+
							'<div class="update-Agreement-name">'+
								'分隔符标签:'+
							'</div>'+
							'<div class="update-Agreement-con">'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="1,S:">'+
									'[S:数据]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="1,SE:">'+
									'[SE:数据]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="1,SN:">'+
									'[SN:长度]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="0,S?">'+
									'[S?]'+
								'</a>'+
							'</div>'+
						'</div>'+
						'<div class="update-Agreement">'+
							'<div class="update-Agreement-name">'+
								'数据标签:'+
							'</div>'+
							'<div class="update-Agreement-con">'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="0,D?">'+
									'[D?]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="0,STR?">'+
									'[STR?]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="1,D:">'+
									'[D:长度]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="2,DE:">'+
									'[DE[长度]|数据]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="2,DEC:">'+
									'[DEC[长度]|数据]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="2,DF:">'+
									'[DF[长度]|数据]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="2,DSF:">'+
									'[DSF[长度]|数据]'+
								'</a>'+
								'<a href="javascript:;" class="PLadd-Agreement" aid="0,GPS">'+
									'[GPS]'+
								'</a>'+
							'</div>'+
						'</div>'+
						
						'<div class="select-Agreement" id="select-Agreement">'+
							
						'</div>'+
						'<div class="update-Agreement">'+
							'<div class="update-Agreement-name">'+
								'添加数量:'+
							'</div>'+
							'<div class="update-Agreement-con">'+
								'<div class="net-form-in">'+
									'<input type="text" id="shuliang-Agreement" name="title" class="layui-input">'+
								'</div>'+
							'</div>'+
						'</div>'+
						
						
					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{

			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				var len = $("#select-Agreement span").length;
				if(len > 0)
				{
					var shu = $("#shuliang-Agreement").val();
					if(shu > 0)
					{
						$("#select-Agreement span").each(function()
						{
							var aid    = $(this).attr("aid");
							var arraid = [aid].toString().split(',');
							if(arraid[0] == 0)
							{
								for(var a=0;a<shu;a++)
								{
									Agreement("D",arraid);
								}
							}else
							{
								var arrdata = [];
								$(this).children("input").each(function()
								{ 
									var intxt = $(this).val();
									arrdata.push(intxt);
								})
								for(var a=0;a<shu;a++)
								{
									Agreement("D",arraid,arrdata);
								}
							}
						})
					}else
					{
						layer.msg('请输入正确的数量！');
					}
				}else
				{
					layer.msg('你还没有选择任何协议！');
				}
			}
		});
	});
	/*** 批量添加协议 ***/
	$(document).on("click", ".PLadd-Agreement", function()
	{
		var aid    = $(this).attr("aid");
		var arraid = [aid].toString().split(',');
		console.log("5");
		Agreement("P",arraid);
		
	})
	/*** 删除协议 ***/
	$(document).on("click", ".icon-Agreement", function()
	{
		$(this).parent(".span-Agreement").remove();		
	})
	/*** 协议规则 ***/
	$(document).on("click", "#xieyiguize", function()
	{
		layer.open(
		{
			type:1 
			,title:'协议规则'
			,area:['1200px','80%']
			,maxmin:true
			,content:'<div class="net-linkJournal">'+
						'<img src="images/biaoqian.jpg" style="width:100%;"/>'+
					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{

			}
		});		
	})
	/*** TCP写入指令 ***/
	$(document).on("click", ".TCP-Write", function()
	{
		layer.open(
		{
			type:1 
			,title:'写入指令'
			,area:['520px','340px']
			,maxmin:true
			,btn:['写入', '取消']
			,content:'<div class="layui-form NodeDiv">'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'类型'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<div class="net-form-in">'+
									'<div class="net-form-inline">'+
										'<input type="radio" lay-filter="zifuchuan" name="TCP-zhi" value="0" title="字符串">'+
									'</div>'+
									'<div class="net-form-inline">'+
										'<input type="radio" lay-filter="zifuchuan" name="TCP-zhi" value="1" title="16进制" checked>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'指令'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<textarea class="Writetextarea-Agreement"></textarea>'+
							'</div>'+
						'</div>'+
					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				form.render();//数据加载完毕更新渲染
			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				layer.close(index);//手动关闭弹窗
			}
		});		
	})
	/*** MBRTU读写指令 ***/
	$(document).on("click", ".MBRTU-Write", function()
	{
		layer.open(
		{
			type:1 
			,title:'读写指令'
			,area:['460px','400px']
			,maxmin:true
			,btn:['确定', '取消']
			,content:'<div class="layui-form NodeDiv">'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'从站地址'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
						'</div>'+

						
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'功能码'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<select name="name1" lay-filter="lei">'+
									'<option value="0">数值型</option>'+
									'<option value="1">开关型</option>'+
									'<option value="2">定位型</option>'+
								'</select>'+
							'</div>'+
						'</div>'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'偏置'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
						'</div>'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'数据格式'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="bit" name="title" class="layui-input" readonly>'+
							'</div>'+
						'</div>'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'采集周期'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
						'</div>'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
						'</div>'+

					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				form.render();//数据加载完毕更新渲染
			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				
			}
		});	
	})
	/*** MBRTU读写指令批量添加 ***/
	$(document).on("click", "#PiMBRTU-Write", function()
	{
		layer.open(
		{
			type:1 
			,title:'读写指令'
			,area:['90%','90%']
			,maxmin:true
			,btn:['确定', '取消']
			,content:'<div class="layui-form NodeDiv PiMBRTU-Write">'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd">'+
								'序号'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'传感器名称'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'从站地址'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'功能码'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'偏置'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'数据格式'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'数据位'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'字节顺序'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'采集周期'+
							'</div>'+
						'</div>'+
						
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'1'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'传感器-1'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<select name="name1" lay-filter="lei">'+
									'<option value="0">数值型</option>'+
									'<option value="1">开关型</option>'+
									'<option value="2">定位型</option>'+
								'</select>'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="" name="title" class="layui-input">'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'-'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'-'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<input type="text" value="10" name="title" class="layui-input">'+
							'</div>'+
						'</div>'+

					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				form.render();//数据加载完毕更新渲染
			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				
			}
		});	
	})
	/*** MQTT写入指令 ***/
	$(document).on("click", ".MQTT-Write", function()
	{
		layer.open(
		{
			type:1 
			,title:'写入指令'
			,area:['520px','280px']
			,maxmin:true
			,btn:['写入', '取消']
			,content:'<div class="layui-form NodeDiv">'+
						'<div class="NodeDivTr">'+
							'<div class="NodeDivTd NodeDivTdR">'+
								'指令'+
							'</div>'+
							'<div class="NodeDivTd">'+
								'<textarea class="Writetextarea-Agreement"></textarea>'+
							'</div>'+
						'</div>'+
					 '</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				form.render();//数据加载完毕更新渲染
			}		 
			,btn2:function(index, layero)//取消回调
			{
				
			}
			,btn1:function(index, layero)//确定回调
			{
				layer.close(index);//手动关闭弹窗
			}
		});		
	})
	/**** 分页  ****/
	layui.use('laypage', function()
	{
		var laypage = layui.laypage;
		laypage.render(
		{
			elem:'net-page'//分页ID
			,count:100//数据总数 需要服务器返回
			,theme:'sensor'
			,limit:20
			,prev:'<i class="layui-icon">&#xe603;</i>'
			,next:'<i class="layui-icon">&#xe602;</i>'
			,layout:['limit', 'count', 'prev', 'page', 'next', 'skip', 'refresh']
			,groups: 1 //只显示 1 个连续页码
			,first: false //不显示首页
			,last: false //不显示尾页
			,jump: function(obj,first)//分页回调
			{
				//首次不执行
				if(!first)
				{
					console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
					console.log(obj.limit); //得到每页显示的条数
				}
			}
		});
	});
	/**** 裁剪上传图片  ****/
	var $image;
	var new_scaleX;
	var new_scaleY;
	var $dataHeight;
	var $dataWidth;
	var URL = window.URL || window.webkitURL;
	var originalImageURL
	var uploadedImageName = 'cropped.jpg';//默认下载图片名称
	var uploadedImageType = 'image/jpeg';
	var uploadedImageURL;
	var options;
	var $download;
	var opw;
	var oph;
	$(document).on("click", "#uploadIMG", function()
	{
		layer.open(
		{
			type:1 
			,title:'图片裁剪'
			,area:['1200px','650px']
			,maxmin:true
			,content:'<div class="uploadmodalbody">'+
						'<div class="uploadmodalleft">'+
							'<div class="uploadmodalimg">'+
								'<img src="" id="Cutting" >'+
							'</div>'+
							'<div class="upload-button">'+
								'<div class="upload-itme">'+
									'<a href="javascript:;" title="选择移动" class="upload-but icon" id="uploadMove">'+
										'&#xe758;'+
									'</a>'+
									'<a href="javascript:;" title="选择裁剪" class="upload-but icon" id="uploadCutting">'+
										'&#xe613;'+
									'</a>'+
								'</div>'+
								
								'<div class="upload-itme">'+
									'<a href="javascript:;" title="放大" class="upload-but icon" id="uploadEnlarge">'+
										'&#xe611;'+
									'</a>'+
									'<a href="javascript:;" title="缩小" class="upload-but icon" id="uploadNarrow">'+
										'&#xe612;'+
									'</a>'+
								'</div>'+
								
								'<div class="upload-itme">'+
									'<a href="javascript:;" title="向上移动" class="upload-but icon" id="uploadTop">'+
										'&#xe606;'+
									'</a>'+
									'<a href="javascript:;" title="向下移动" class="upload-but icon" id="uploadBottom">'+
										'&#xe603;'+
									'</a>'+
									'<a href="javascript:;" title="向左移动" class="upload-but icon" id="uploadLeft">'+
										'&#xe605;'+
									'</a>'+
									'<a href="javascript:;" title="向右移动" class="upload-but icon" id="uploadRight">'+
										'&#xe607;'+
									'</a>'+
								'</div>'+
								'<div class="upload-itme">'+
									'<a href="javascript:;" title="向左旋转" class="upload-but icon" id="uploadRotateL">'+
										'&#xe608;'+
									'</a>'+
									'<a href="javascript:;" title="向右旋转" class="upload-but icon" id="uploadRotateR">'+
										'&#xe609;'+
									'</a>'+
								'</div>'+
								'<div class="upload-itme">'+
									'<a href="javascript:;" title="上下翻转" class="upload-but icon upload-txt1" id="uploadScaleY">'+
										'&#xe72a;'+
									'</a>'+
									'<a href="javascript:;" title="左右翻转" class="upload-but icon upload-txt1" id="uploadScaleX">'+
										'&#xe72f;'+
									'</a>'+
								'</div>'+
								'<div class="upload-itme">'+
									'<a href="javascript:;" title="重置" class="upload-but icon" id="uploadReset">'+
										'&#xe617;'+
									'</a>'+
									'<a href="javascript:;" title="上传" class="upload-but icon">'+
										'&#xe775;'+
										'<input type="file" class="uploadImg" id="inputImage" name="file" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff">'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="uploadmodalright">'+
							'<div class="uploadpreview">'+
								'<div id="uploadpreview">'+
								'</div>'+
							'</div>'+
							'<div class="upload-list">'+
								'<div class="uploadLi">'+
									'<div class="uploadLitxt">'+
										'图片裁剪后宽'+
									'</div>'+
									'<div class="uploadLiIn">'+
										'<input type="text" class="uploadLiInput" id="dataWidth" disabled>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="upload-list">'+
								'<div class="uploadLi">'+
									'<div class="uploadLitxt">'+
										'图片裁剪后高'+
									'</div>'+
									'<div class="uploadLiIn">'+
										'<input type="text" class="uploadLiInput" id="dataHeight" disabled>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="upload-list">'+
								'<div class="uploadUl">'+
									'<a href="NaN" class="uploadUla uploadUlb">'+
										'0:0'+
									'</a>'+
									'<a href="1.7777777777777777" class="uploadUla">'+
										'16:9'+
									'</a>'+
									'<a href="1.3333333333333333" class="uploadUla">'+
										'4:3'+
									'</a>'+
									'<a href="0.6666666666666666" class="uploadUla">'+
										'2:3'+
									'</a>'+
									'<a href="1" class="uploadUla">'+
										'1:1'+
									'</a>'+
								'</div>'+
							'</div>'+
							'<div class="upload-list">'+
								'<a href="javascript:;" class="uploadDown" id="uploadDown" download>'+
									'下载'+
								'</a>'+
							'</div>'+
							'<div class="upload-list">'+
								'<a href="javascript:;" class="uploadDown uploadDownB" id="uploadYse">'+
									'确定'+
								'</a>'+
							'</div>'+
						'</div>'+
					'</div>'
			,success:function(layero,index)//弹出层成功后回调
			{
				$image = $('#Cutting');
				$dataHeight = $('#dataHeight');
				$dataWidth = $('#dataWidth');
				$download = $('#uploadDown');
				originalImageURL = $image.attr('src');
				options =  
				{
					minContainerWidth:900,
					minContainerHeight:500,
					preview:'#uploadpreview',
					crop:function(e)
					{
						//console.log(e.detail.x);
						//console.log(e.detail.y);
						//console.log(e.detail.width);
						//console.log(e.detail.height);
						//console.log(e.detail.rotate);
						//console.log(e.detail.scaleX);
						//console.log(e.detail.scaleY);
						$dataHeight.val(Math.round(e.detail.height));
						$dataWidth.val(Math.round(e.detail.width));
						opw = Math.round(e.detail.width);
						oph = Math.round(e.detail.height);
						new_scaleX = e.detail.scaleX;
						new_scaleY = e.detail.scaleY;
					}
				};
				$image.on(
				{
					ready: function (e) {
					  //console.log(e.type);
					},
					cropstart: function (e) {
					 // console.log(e.type, e.detail.action);
					},
					cropmove: function (e) {
					  //console.log(e.type, e.detail.action);
					},
					cropend: function (e) {
					 //console.log(e.type, e.detail.action);
					},
					crop: function (e) {
					 // console.log(e.type);
					},
					zoom: function (e) {
					 // console.log(e.type, e.detail.ratio);
					}
				}).cropper(options);
			}
		});		
	})
	//选择移动
	$(document).on("click", "#uploadMove", function()
	{
		$image.cropper("setDragMode","move");
	});
	//选择裁剪
	$(document).on("click", "#uploadCutting", function()
	{
		$image.cropper("setDragMode","crop");
	});
	//放大
	$(document).on("click", "#uploadEnlarge", function()
	{
		$image.cropper("zoom",0.1);
	});
	//缩小
	$(document).on("click", "#uploadNarrow", function()
	{
		$image.cropper("zoom",-0.1);
	});
	//向上移动
	$(document).on("click", "#uploadTop", function()
	{
		$image.cropper("move",0,-1);
	});
	//向下移动
	$(document).on("click", "#uploadBottom", function()
	{
		$image.cropper("move",0,1);
	});
	//向左移动
	$(document).on("click", "#uploadLeft", function()
	{
		$image.cropper("move",-1,0);
	});
	//向右移动
	$(document).on("click", "#uploadRight", function()
	{
		$image.cropper("move",1,0);
	});
	//向左旋转
	$(document).on("click", "#uploadRotateL", function()
	{
		$image.cropper("rotate",-45);
	});
	//向左旋转
	$(document).on("click", "#uploadRotateR", function()
	{
		$image.cropper("rotate",45);
	});
	//上下翻转
	$(document).on("click", "#uploadScaleY", function()
	{
		if(new_scaleY == 1){
			$image.cropper("scaleY",-1);
		}else{
			$image.cropper("scaleY",1);
		}
	});
	//左右翻转
	$(document).on("click", "#uploadScaleX", function()
	{
		if(new_scaleX == 1){
			$image.cropper("scaleX",-1);
		}else{
			$image.cropper("scaleX",1);
		}
	});
	//重置
	$(document).on("click", "#uploadReset", function()
	{
		$image.cropper("reset");
	});
	//选择比例
	$(document).on("click", ".uploadUla", function(e)
	{
		e.preventDefault();//阻止浏览器默认事件
		if(!$(this).hasClass("uploadUlb"))
		{
			var bl = $(this).attr("href");
			$(".uploadUlb").removeClass("uploadUlb");
			$(this).addClass("uploadUlb");
			options["aspectRatio"] = bl;
			$image.cropper('destroy').cropper(options);
		}
	});
	//下载
	$(document).on("click", "#uploadDown", function()
	{
		var result = $image.cropper("getCroppedCanvas",{maxWidth:4096,maxHeight:4096});
		$download.attr('href', result.toDataURL(uploadedImageType));
	});
	//裁剪完成
	$(document).on("click", "#uploadYse", function()
	{
		var result = $image.cropper("getCroppedCanvas",{maxWidth:4096,maxHeight:4096});// 获取裁剪后的base64位编码
		var img    = result.toDataURL(uploadedImageType);
		var imgFile=convertBase64UrlToBlob(img);
	});
	
})
/*** 添加标签方法  ***/
function Agreement(id,arraid,arrdata)
{
	var inp;
	if(arraid[0] == 0)
	{
		inp = "";
	}else if(arraid[0] == 1)
	{
		if(arrdata){
			inp = '<input type="text" value="'+arrdata[0]+'" name="title" class="input-Agreement">';	
		}else{
			inp = '<input type="text" name="title" class="input-Agreement">';
		}
		
	}else if(arraid[0] == 2)
	{
		if(arrdata){
			inp = '[<input type="text" value="'+arrdata[0]+'" name="title" class="input-Agreement">]|<input type="text" value="'+arrdata[1]+'" name="title" class="input-Agreement">';
		}else{
			inp = '[<input type="text" name="title" class="input-Agreement">]|<input type="text" name="title" class="input-Agreement">';
		}
	}
	var tem =
			'<span class="span-Agreement" aid="'+arraid+'">'+
				'['+arraid[1]+
				inp+
				']'+
				'<a href="javascript:;" class="layui-icon icon-Agreement">'+
					'&#xe640;'+
				'</a>'+
			'</span>';
	if(id == "D")
	{
		$("#Agreement-Receive").append(tem);
	}else if(id == "P")
	{
		$("#select-Agreement").append(tem);
	}	
}
/*** 添加节点方法 ***/
function Node(min,qia,lei,wei,dan)
{
	var name = qia || "";
	var danw = dan || "";
	var leix;
	switch(lei)
	{
		case "0":
			leix = 
				'<select class="proj-titleSelect" name="interest" lay-filter="required" lay-search="">'+
					'<option value="0" selected>下拉1</option>'+
					'<option value="1">下拉2</option>'+
					'<option value="2">下拉3</option>'+
				'</select>';
			break;
		case "1":
				leix = 
				'<select class="proj-titleSelect" name="interest" lay-filter="required" lay-search="">'+
					'<option value="0">下拉1</option>'+
					'<option value="1" selected>下拉2</option>'+
					'<option value="2">下拉3</option>'+
				'</select>';
			break;
		case "2":
				leix = 
				'<select class="proj-titleSelect" name="interest" lay-filter="required" lay-search="">'+
					'<option value="0">下拉1</option>'+
					'<option value="1">下拉2</option>'+
					'<option value="2" selected>下拉3</option>'+
				'</select>';
			break;	
		default:
				leix = 
				'<select class="proj-titleSelect" name="interest" lay-filter="required" lay-search="">'+
					'<option value="0">下拉1</option>'+
					'<option value="1">下拉2</option>'+
					'<option value="2">下拉3</option>'+
				'</select>';
	}
	var weix;
	switch(wei)
	{
		case "0":
			weix = 
				'<select name="interest" lay-filter="dan">'+
					'<option value="0" selected>0(小数位)</option>'+
					'<option value="1">1(小数位)</option>'+
					'<option value="2">2(小数位)</option>'+
					'<option value="3">3(小数位)</option>'+
					'<option value="4">4(小数位)</option>'+
				'</select>'
			break;
		case "1":
			weix = 
				'<select name="interest" lay-filter="dan">'+
					'<option value="0">0(小数位)</option>'+
					'<option value="1" selected>1(小数位)</option>'+
					'<option value="2">2(小数位)</option>'+
					'<option value="3">3(小数位)</option>'+
					'<option value="4">4(小数位)</option>'+
				'</select>'
			break;
		case "2":
			weix = 
				'<select name="interest" lay-filter="dan">'+
					'<option value="0">0(小数位)</option>'+
					'<option value="1">1(小数位)</option>'+
					'<option value="2" selected>2(小数位)</option>'+
					'<option value="3">3(小数位)</option>'+
					'<option value="4">4(小数位)</option>'+
				'</select>'
			break;
		case "3":
			weix = 
				'<select name="interest" lay-filter="dan">'+
					'<option value="0">0(小数位)</option>'+
					'<option value="1">1(小数位)</option>'+
					'<option value="2">2(小数位)</option>'+
					'<option value="3" selected>3(小数位)</option>'+
					'<option value="4">4(小数位)</option>'+
				'</select>'
			break;
		case "4":
			weix = 
				'<select name="interest" lay-filter="dan">'+
					'<option value="0">0(小数位)</option>'+
					'<option value="1">1(小数位)</option>'+
					'<option value="2">2(小数位)</option>'+
					'<option value="3">3(小数位)</option>'+
					'<option value="4" selected>4(小数位)</option>'+
				'</select>'
			break;
		default:
			weix = 
				'<select name="interest" lay-filter="dan">'+
					'<option value="0">0(小数位)</option>'+
					'<option value="1">1(小数位)</option>'+
					'<option value="2">2(小数位)</option>'+
					'<option value="3">3(小数位)</option>'+
					'<option value="4">4(小数位)</option>'+
				'</select>'
	}
	var tem = 
		'<div class="net-form-tr">'+
			'<div class="net-form-td">'+
				'<input type="text" value="'+name+min+'" name="title" class="layui-input">'+
			'</div>'+
			'<div class="net-form-td">'+
				leix+
			'</div>'+
			'<div class="net-form-td">'+
				weix+
			'</select>'+
			'</div>'+
			'<div class="net-form-td">'+
				'<input type="text" value="'+danw+'" placeholder="单位" name="title" class="layui-input">'+
			'</div>'+
			'<div class="net-form-td">'+
				'<input type="text" name="title" class="layui-input" placeholder="排序">'+
			'</div>'+
			'<div class="net-form-td">'+
				'<img src="images/DOC图标.png" class="net-form-img">'+
			'</div>'+
			'<div class="net-form-td">'+
				'<a href="javascript:;" class="net-form-a">'+
					'删除'+
				'</a>'+
			'</div>'+
		'</div>';
		$("#ReceiveNode").append(tem);
}
/** 设备右键弹方法 **/
function mouseNetPopup(id,e)
{
	var w     = $(window).width();
	var x     = "right:"+(w - e.clientX) +"px;";//top偏移量
	var y     = e.clientY;//left偏移量
	var h     = $(window).height();
	var poseY = (y+180)>h?"bottom:" + (h-y) + "px":"top:" + y + "px";
	var up    = id.prev("tr");
	var down  = id.next("tr");
	var C2    = "";
	var C3    = "";
	if(up.length   == 0) C2 = "netPopupDrop";
	if(down.length == 0) C3 = "netPopupDrop";
	var mouseEquipment=
		'<div class="netPopup" id="netPopup" style="'+ x + poseY +'">'+
			'<p class="netPopupName">'+
				'操作'+
			'</p>'+
			'<a href="设备详情页面.html">'+
				'设置'+
			'</a>'+
			'<a href="javascript:;" class="'+C2+'" id="netPopupTo">'+
				'上移一行'+
			'</a>'+
			'<a href="javascript:;" class="'+C3+'" id="netPopupBo">'+
				'下移一行'+
			'</a>'+
			'<a href="javascript:;" id="netPopupDe">'+
				'删除'+
			'</a>'+
			'<a href="javascript:;" id="netPopupTe">'+
				'移动到'+
				'<div class="netPopupR" id="netPopupR">'+
					'<p class="zu0001">深圳区第一组</p>'+
					'<p class="zu0002">深圳区第二组</p>'+
				'</div>'+
			'</a>'+
		'</div>';
	return $("#net-con").append(mouseEquipment);
}
//设备右键弹窗删除
function mouseNetPopupDele()
{
	if($("#netPopup").length != 0)
	{
		$(".set").removeClass("set");
		$("#netPopup").remove();//删除鼠标右键dome
	}
}
/*****************************鼠标按下 相关事件*******************************/
$(function()
{
	$(document).on("mousedown",function(e)
	{
		var key =  e.which; //获取鼠标键位  
		if(key == 1 || key == 3)//如果鼠标左键按下
		{
			var target = $(e.target);
			if(target.closest("#netPopup, .layui-layer").length == 0)
			{
				mouseNetPopupDele();
			}
		}
	})
})
