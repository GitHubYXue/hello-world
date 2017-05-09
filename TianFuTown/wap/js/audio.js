app.controller('voiceCtrl', ["$scope", "$ionicLoading", function(a, loading) {
	a.currentAudio = {};
	//从url获取参数townId
	console.log(localStorage.townId);
	a.townId = getQueryString('townId');
	$.ajax({
		type: "post",
		url: API+"/Trip/audioList",
		data: {
			sys_town_id: a.townId
		},
		success: function(data) {
			a.allAudio = data.returnData;
			a.currentAudio = a.allAudio[0].audio[0];
			a.$apply();
			console.log(a.allAudio);
			//			console.log(a.currentAudio);

			if(a.currentAudio) {
				player.src = a.currentAudio.net_url;
			}

		}
	});

	//音频播放部分开始
	var player = document.getElementById("audio");

	a.play = function() {
		if($(".play").hasClass("active")) {
			player.pause(); //暂停
		} else {
			player.play();
		}
	}

	//监听播放状态

	$("#audio").on("play", function() {
		$(".play").addClass("active")
		$(".play i").removeClass("ion-play").addClass("ion-pause");
	})

	$("#audio").on("pause", function() {
		$(".play").removeClass("active")
		$(".play i").removeClass("ion-pause").addClass("ion-play");
	})

	$("#audio").on("timeupdate", function(e) {
		console.log(e.target.duration)
		if(isNaN(e.target.duration)) {
			a.alert('对不起，语音导航获取错误');
			$(".play-box .time").html(" 0:00 / 0:00");
		} else {
			a.player_duration = e.target.duration; //.duration获取音频或者视频长度，单位为时间
			//target.duration
			var jd = (e.currentTarget.currentTime / e.target.duration) * 100;
			$(".play-box .progress .true").width(parseFloat(jd).toFixed(1) + "%");
			$(".play-box .time").html(a._converToTime(e.target.duration) + " / " + a._converToTime(e.currentTarget.currentTime));
		}

	})

	$(".zujian").click(function(event) {
		var x = event.offsetX;
		var w = $(this).width();
		var xx = parseFloat((x / w)).toFixed(2) * a.player_duration;
		player.currentTime = xx;
	})

	a._converToTime = function(time) {
			//将剩余秒数转化为分钟
			var min = Math.floor((time / 60) % 60);
			//将剩余秒数转化为秒钟
			var sec = Math.floor(time % 60);
			var cTime;
			if(sec < 10) {
				sec = '0' + sec;
			}
			cTime = min + ':' + sec
			return cTime;
		}
		//音频播放部分结束
		//音频切换
	a.changeAudio = function(audio) {

		//				player.src = "http://sc.111ttt.com/up/mp3/317518/9D6D15344319D263657E9ABD63FD1B91.mp3";
		//player.src =  audio.net_url;
		console.log(audio);
		//				a.currentAudio=audio.net_url;
		if(audio) {
			player.src = audio.net_url;
			a.currentAudio = audio;
			player.play();
		} else {
			player.src='';
			player.pause();
			a.alert('对不起，未获取到此语音导航');
		}

	}
}])