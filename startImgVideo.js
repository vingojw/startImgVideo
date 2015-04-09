/*
	功能：一帧一帧图片模拟播放视频的效果
	options:
		imgs			   :    图片地址的数组   ['./images/01.jpg','./images/03.jpg','./images/02.jpg',...]
		target			   :    容器
		imgsOnloadCallback :    所有图片加载好之后的回调(毕竟加载好之后才能播放)
		playCallback	   :    播放完毕后的回调
		className          :    想要加的类名
		timeLenth          :    多少秒播放完毕这些图片
*/
function startImgVedio(opt){
	var imageUrls = opt.imgs,
		target = opt.target,
		index = 0,
		secChild,
		ilen = imageUrls.length,
		milliseconds = (opt.timeLenth * 1000 / ilen) | 0 ; //多少毫秒更换一张图
	var util = {
		//更换图片地址
		changeUrl:function(){
			secChild[index].style.display = 'none';
			if(++index >= ilen){
				opt.playCallback && opt.playCallback();
				return;
			}
			setTimeout(function(){
				util.changeUrl();
			},milliseconds);
		},
		/**
		图片全部加载完毕后
		imgs: 图片数组，dom
		fn:   全部加载完毕后的回调
		*/
		imgComplete:function (imgs,fn){
			var vlen = imgs.length,len = 0;
			while(imgs.length){
				var shif = imgs.shift();
				if(shif.complete){//图片如果缓存过
		 			a();
				} else {
					shif.onload = a;
				}
			}
			function a(){
				if(++len==vlen){
					fn && fn();
				}
			}
		}
	};


	//用于判断图片全部加载完毕
	var imgs = [],_img;
	for (var i = 0,len = imageUrls.length; i < len; i++) {
		_img = new Image();
		_img.src =  imageUrls[i];
		imgs.push(_img);
	};

	//这里给图片赋值
	var _secHtml = '';
	for (var i = 0; i < imageUrls.length; i++) {
		_secHtml += '<div class="'+ opt.className +'" style="background-image:url('+ imageUrls[i] +')"></div>';
	};
	target.innerHTML = _secHtml;
	secChild = target.childNodes;

	//图片加载完毕后
	util.imgComplete(imgs,function(){
		opt.imgsOnloadCallback();
		util.changeUrl();
	});
}