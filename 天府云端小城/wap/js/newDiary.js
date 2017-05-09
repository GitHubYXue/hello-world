 var newDiary={};

 newDiary.trip_user_id=localStorage.userId;
		newDiary.imgurl=[];
		//获取时间
		function startDate() {
			new yxCalendar({
				date: $('#startDate').html(),
				callback: function(date) {
					$('#startDate').html(date);
					$('#startDate').val(date);
				}
			});

		}
        //获取小镇列表
		function getTown() {
			$('.alltown').animate({
				left: 0
			}, 500);
		}
		//关闭小镇列表

		$('.close').click(function() {
			$('.alltown').animate({
				left: '-100%',
			}, 500);			
		})
		
        
		$('.star i').click(function() {
			var index = $(this).index();
			newDiary.trip_start=Number(index)+1;//星级
			$('.star i').removeClass('text-drak-yellow');
			$('.star i').slice(0, index + 1).addClass('text-drak-yellow');
			
		})

		//图片上传部分开始

		// 初始化Web Uploader
		var $list = $("#fileList");
		var $btn = $("#ctlBtn"); //开始上传  
		var thumbnailWidth = 100; //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档  
		var thumbnailHeight = 100;
		
		var uploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: false,

			// swf文件路径
			swf: '__STATIC__/webuploader/js/Uploader.swf',

			// 文件接收服务端。
			server: API+'/Common/govExciseImg',

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: '#filePicker',

			// 只允许选择图片文件。
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/jpeg,image/jpg,image/png'
			}
		});

		// 当有文件添加进来的时候
		uploader.on('fileQueued', function(file) {

			var $li = $(
					'<div id="' + file.id + '" class="file-item thumbnail">' +
					'<img>' +
					'<div class="info">' + file.name + '</div>' +
					'</div>'
				),
				$img = $li.find('img');

			// $list为容器jQuery实例
			$list.append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			// thumbnailWidth x thumbnailHeight 为 100 x 100
			uploader.makeThumb(file, function(error, src) {
				if(error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}

				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);
			
		
		});

		// 文件上传过程中创建进度条实时显示。
		uploader.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress span');

			// 避免重复创建
			if(!$percent.length) {
				$percent = $('<p class="progress"><span></span></p>')
					.appendTo($li)
					.find('span');
			}

			$percent.css('width', percentage * 100 + '%');
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on('uploadSuccess', function(file, response) {
			$('#' + file.id).addClass('upload-state-done');
			
			if(response.status==1){
				newDiary.imgurl.push(response.returnData[0]);
//				console.log(response);
				
			}else{
				
			}
			
			
		});

		// 文件上传失败，显示上传出错。
		uploader.on('uploadError', function(file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');

			// 避免重复创建
			if(!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}

			$error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		uploader.on('uploadComplete', function(file) {
			$('#' + file.id).find('.progress').remove();
			var imgNum=$('#fileList').find('.file-item').length;
//			console.log(newDiary.imgurl.length);
//			console.log(imgNum);
			if(newDiary.imgurl.length==imgNum){
				console.log(newDiary);
//				图片全部上传成功后添加游记
				$.ajax({
					type:"post",
					url:API+"/Trip/writeNotes",
					data:newDiary,
					async:true,
					success:function(data){
						
						alertDemo('发布成功！');
						$('#ctlBtn').attr('disabled','true');
						setTimeout(function(){window.history.go(-1);},1500);
						
						console.log(data);
					}
				});
				
			}
		});

		//图片上传js结束

		app.controller('newDiaryCtrl', ['$scope', '$ionicLoading', function(a, loading) {
			a.starNum = 0;
			a.isPrivate={};
			a.isPrivate.checked=true;
			//获取小镇信息
			$.ajax({
				type: "post",
				url: API+"/Trip/townList",
				success: function(data) {
					a.allTwon = data.returnData;
					a.$apply();
					//					console.log(a.allTwon);
				}
			});
			//选择游记小镇
			a.choseTown = function(twon_name, twon_id) {

				console.log(twon_name + " , " + twon_id);
				newDiary.town_id = twon_id;
				newDiary.trip_address=twon_name;
				$('#townName').text(twon_name);
				$('.alltown').animate({
					left: '-100%'
				}, 500);
			};
			
			
		a.submit=function(){
			
			
			newDiary.trip_content=$('#trip_content').val();
			//判断星级
			if(!newDiary.trip_start){
				a.alert('请选择星级！');
				return false;
			}
			// 判断有机内容
			if(!newDiary.trip_content){
				a.alert('请填写游记内容');
				return false;
			}
			//判断小镇id
			if(!newDiary.town_id){
				a.alert('请选择游记小镇');
				return false;
			}
			//判断时间
			newDiary.trip_date=$('#startDate').text();
			
			if(!newDiary.trip_date){
				a.alert('请选择时间');
				return false;
			}else{
				newDiary.trip_date=(Date.parse(new Date(newDiary.trip_date)))/1000;
			}
			//判断标题
			newDiary.trip_caption =$('#diaryTitle').val();
			if(!newDiary.trip_caption){
				a.alert('请填写游记标题');
				return false;
			}
			
			if(a.isPrivate.checked=true){
				newDiary.is_private=2;
			}else{
				newDiary.is_private=1;
			}
			
			if($('#fileList').find('.file-item').length==0){
				a.alert('请选择游记图片');
				return false;
			}
			
			uploader.upload();
			
			
		}
		
		
		
		}])
				//提交游记内容

		