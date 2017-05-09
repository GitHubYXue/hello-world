app.controller('personInfoCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$timeout', 'verify', function(a, loading, pop, timeout, verify) {

	var oldUserInfo = localStorage.userInfo;

	$.ajax({
		type: "post",
		url: API+"/User/userInfo",
		data: {
			user_id: localStorage.userId
		},
		success: function(data) {
			localStorage.userInfo = JSON.stringify(data.returnData);
			a.userInfo = data.returnData;
			console.log(a.userInfo);
			a.$apply();
		}
	});

	var oldUserInfo = a.userInfo;
	//  是否退出登陆confirm 对话框
	a.showConfirm = function() {
		var confirmPopup = pop.confirm({

			title: '您确定要退出登陆？',
			cancelText: '取消',
			okText: '确认'
		});
		confirmPopup.then(function(res) {

			if(res) {
				console.log('退出');
				localStorage.removeItem('userInfo');
				localStorage.removeItem('userId');
				localStorage.removeItem('townId');
				window.location = '/wap.php/';
			}
		});
	};

	// 修改个人信息弹出框
	a.showPopup = function(title, parameterName) {
		a.newdata = {};
		// 自定义弹窗
		var myPopup = pop.show({
			template: '<input type="text" ng-model="newdata.newInfo" style="padding:0px 10px;">',
			title: title,
			scope: a,
			buttons: [{
				text: '返回'
			}, {
				text: '<b>确认</b>',
				type: 'button-positive',
				onTap: function(e) {
					//修改真实名称
					if(!a.newdata.newInfo) {
						e.preventDefault();
					} else {
						if(parameterName == 'real_name') {
							if(!a.newdata.newInfo) {

								e.preventDefault();
								return false;
							} else {
								a.userInfo[parameterName] = a.newdata.newInfo;
							}
						}
						//修改电话号码
						else if(parameterName == 'user_name') {
							if(!verify.tel(a.newdata.newInfo)) {
								a.alert('请输入正确的电话号码');
								a.newdata.newInfo = '';
								e.preventDefault();
								return false;
							} else {
								a.userInfo[parameterName] = a.newdata.newInfo;
							}

						}
						//修改身份证号
						else if(parameterName == 'id_card') {
							if(!verify.idCard(a.newdata.newInfo)) {
								a.alert('请输入正确的身份证号码');
								a.newdata.newInfo = '';
								e.preventDefault();
								return false;
							} else {
								a.userInfo[parameterName] = a.newdata.newInfo;
							}
						}
						//修改密码
						else if(parameterName == 'user_passwd') {
							if(!verify.pass(a.newdata.newInfo)) {
								a.alert('请输入6-16位数字和字母');
								a.newdata.newInfo = '';
								e.preventDefault();
								return false;
							} else {
								a.userInfo[parameterName] = a.newdata.newInfo;
								localStorage.removeItem('userInfo');
								localStorage.removeItem('userId');
								localStorage.removeItem('townId');
								window.location = '/wap.php/';
							}
						}
					}
				}
			}, ]
		});

	};

	a.update_tx = function() {
		$("#imgdoc").click();
	}

	//监听头像选择的返回
	$("#imgdoc").change(function(data) {

		var files = data.target.files[0]; //数据内容
		var paths = data.target.value; //数据地址
		//判断格式
		if((files.type).indexOf("image") < 0) {
			alert("格式不正确，请重新选择");
			return false;
		}

		//上传头像到服务器

		//		var formData = new FormData();
		//		formData["file"] = files;
		var file = $("#imgdoc").val();
		$.ajax({
			type: "post",
			url: API+"/Common/govExciseImg",
			data: file,
			enctype: 'multipart/form-data',
			success: function(e) {
				alert(e)
			},
			error: function() {
				alert(111)
			}
		});

	})

	a.updateUserInfo = function() {
		//		a.userInfo[header_img]=
		console.log(a.userInfo);
		//发送请求更新用户信息
		if(oldUserInfo != a.userInfo) {
			$.ajax({
				type: "post",
				url: API+"/User/updateUser",
				async: true,
				data: a.userInfo,
				dataType: 'json',
				success: function(data) {
					if(data.status == 1) {
						console.log(data);
						localStorage.userInfo = JSON.stringify(a.userInfo);
						a.$apply();
						a.alert('您已成功更新信息');

					} else {
						a.alert('对不起，您的信息更新失败,请重新更新');
					}
				}
			});
		} else {
			a.alert('您没有更新任何信息');
		}

	};
	//上传图片
	a.getImg = function() {
		//获取并预览图片
		var fileObj = document.getElementById("imgdoc");
		var docImg = document.getElementById("docImg");
		// 注意这里
		// fileObj.files[0];
		var ispic = /^\S+\.(?:png|jpg|bmp|gif)$/i;
		if(fileObj.files[0] && ispic.test(fileObj.files[0].name)) {
			var src = window.URL.createObjectURL(fileObj.files[0]);
			docImg.src = src;
		} else {
			a.alert('请选择正确的图片文件');
			return false;
		}
		//上传图片

		$("#imgdoc").fileupload({
			dataType: 'json',
			url: "http://8098.xlufei.com/Public/Uploads/app/20160823/", //文件上传地址，当然也可以直接写在input的data-url属性内
			done: function(e, result) {
				//done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
				//注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
				//返回的数据在result.result中，假设我们服务器返回了一个json对象
				console.log(11);
				console.log(JSON.stringify(result.result));
			}
		})

		//		$("#imgdoc").on('change',function(){
		//			
		//		})

	}

}])