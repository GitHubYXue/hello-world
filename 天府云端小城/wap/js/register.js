app.controller('registerCtrl', ['$scope', 'verify', '$interval', '$ionicLoading', function(a, verify, interval, loading) {
//	localStorage.removeItem('userId');
//	localStorage.removeItem('userInfo');

	a.tel = '';
	a.testCode = '';
	a.second = '获取验证码';
	a.isDis = true;

	$('input[type=tel]').bind('input propertychange', function() {
		if(!a.tel) {
			a.isDis = true;
		} else {
			a.isDis = false;
		}
	});

	//	localStorage.removeItem('userInfo');
	//获取验证码
	a.getCode = function() {

			$('input[type=tel]').attr('disabled', 'true');

			if(!a.tel) {

				a.alert('请输入手机号');
				return false;
			}
			//判断是否正确的输入手机号
			if(!verify.tel(a.tel)) {
				$('input[type=tel]').removeAttr('disabled');
				a.alert('请输入正确的手机号');

				return false;
			}
			console.log(a.tel);
			$('button[name=testCode]').attr('disabled', 'true');
			console.log($('button[name=testCode]').attr('disabled'));
			//请求验证码
			$.ajax({
				type: "post",
				url: API+"/Common/getCheckCode",
				dataType: 'json',
				data: {
					phone: a.tel,
					regedit: 'regedit',
					message_type:1
				},
				success: function(data) {
					console.log(data);
					if(data.status == 1) {
						a.alert('验证码已发送，请注意查收！');

						//获取验证码倒计时
						//a.second=10;
						var lastTime = 60;
						var times = interval(function() {
							a.isDis = true;
							if(lastTime == 1) {
								a.second = '获取验证码';
								a.isDis = false;
								interval.cancel(times); //清除interval
								return false;
							}
							lastTime--;
							a.second = lastTime + '秒后重新发送';
						}, 1000)
					} else {
						a.alert(data.message);
					}
					$('input[type=tel]').removeAttr('disabled');
					$('button[name=testCode]').removeAttr('disabled');
					console.log($('button[name=testCode]').attr('disabled'));
				}
			});

		},
		a.register = function() {
			if(!a.testCode) {
				a.alert('请输入验证码！');
				return false;
			}

			if(!a.password) {
				a.alert('请输入密码！');
				return false;
			}

			if(!verify.pass(a.password)) {
				a.alert('请输入密码6到16位数字或字母！');
				return false;
			}

			//发送请求
			var device_identifier = hex_md5(a.tel);
			var device_name = checkPhone();

			function checkPhone() {
				var phone = 0;
				var u = navigator.userAgent;
				if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
					phone = 1;
				} else if(u.indexOf('iPhone') > -1) {
					phone = 2;
				}
				return phone;
			}
			var registerdata = {
				user_name: a.tel,
				user_passwd: a.password,
				device_identifier: device_identifier,
				device_name: device_name,
				user_group_id: '1',
				checkCode: a.testCode
			}

			$.ajax({
				type: "post",
				url: API+"/user/userRegister",
				dataType: "json",
				data: registerdata,
				beforeSend: function() {
					loading.show();
				},
				success: function(data) {
					console.log(data);
					if(data.status == 1) {
						window.location = '/wap.php/';
					} else {
						a.alert(data.message);
					}
				},
				error: function(error) {
					console.log(error);
				}
			});

		}

}])