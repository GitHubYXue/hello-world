
$.ajax({
	type:"post",
	url:API+"/Double/servicecarrier",
	dataType:'json',
	success:function(data){
		console.log(data);
		var carrier = data.returnData;
		var carrierData = carrier[0];
		var carrierName = carrier[0].service_carrier_name;
		/*寰幆鍚庡彴鏁版嵁*/
		console.log(carrier[0]);
		for (var i = 0;i<carrier.length;i++) {
			var carrierImg = document.getElementsByClassName("carrier_img").src = carrier[i].service_carrier_img;
			var carrier1 = "<a href='double_carrier_details.html'><div class='list'><div class='item item-thumbnail-left'><img src='"+ carrierImg+"'/><p class='word title'>" +carrier[i].service_carrier_name + "</p><p class='word'>" + carrier[i].service_carrier_manager+ "</p><p class='word'>" +carrier[i].service_carrier_address+ "</p><p class='word'>"+carrier[i].service_carrier_tel+"</p></div></div></a>";
			$(".content").append(carrier1);

		}
	}
});

