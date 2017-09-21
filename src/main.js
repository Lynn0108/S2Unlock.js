
	function S2Unlock(el, option) {
		this.wrap = document.querySelector(el);
		this.width = option.width || '300';
		this.height = option.height || '50';
		this.standard = option.standard || 'width';
		this.slideBtn = document.querySelector(option.slideBtn);
		this.slideImg = option.slideImgSrc || '';
		this.wrapImg = option.wrapImgSrc || '';
		this.slideW = this.width / 5;
		this.hint = option.hint || '';
		this.btnColor = option.btnColor || '#089';
		this.wrapColor = option.wrapColor || '#089';
		this.callback = option.callback;
		this.event = {
			start: 'mousedown',
			move: 'mousemove',
			end: 'mouseup'
		};
		this.endL = this.width - this.slideW;
	}
	S2Unlock.prototype.init = function() {
		// 
		var _this = this;
		this.initStyle();
		if (this.wrapImg || this.slideImg) {
			this.initImg();
			var img = new Image();
			img.src = this.slideImg;
			img.onload = function() {
				_this.width = _this.wrap.offsetWidth;
				_this.slideW = _this.slideBtn.offsetWidth;
				_this.endL = _this.width - _this.slideW;
				_this.bindEvent();
			}
		} else {
			this.wrapStyle();
			this.slideStyle();
			this.bindEvent();
		}				
	}
	S2Unlock.prototype.initStyle = function() {
		this.wrap.style.width = this.width + 'px';
	}
	S2Unlock.prototype.wrapStyle = function() {
		this.wrap.style.borderColor = this.wrapColor;
		this.wrap.style.height = this.height + 'px';
	}
	S2Unlock.prototype.slideStyle = function() {
		this.slideBtn.style.background = this.btnColor;
		this.slideBtn.style.width = this.slideW + 'px';
	}
	S2Unlock.prototype.initImg = function() {
		if (this.wrapImg) {
			this.wrap.style.border = 'none';
			var wrapImg = document.createElement("img");
			wrapImg.setAttribute('src', this.wrapImg);
			this.wrap.style.backgroundImage = 'url("' + this.wrapImg + '")';
			this.wrap.appendChild(wrapImg);
		}
		if (this.slideImg) {
			var slideImg = document.createElement("img");
			slideImg.setAttribute('src', this.slideImg);
			this.slideBtn.style.backgroundImage = 'url("' + this.slideImg + '")';
			this.slideBtn.appendChild(slideImg);
		}
	}
	//this.endL
	S2Unlock.prototype.bindEvent = function() {
		var _this = this;
		var endL = this.endL;
		var startX = 0;
		var nowX = 0;
		this.slideBtn.addEventListener(_this.event.start, startHandler, false);
		// this.slideBtn.addEventListener(_this.event.move, moveHandler, false);
		this.slideBtn.addEventListener(_this.event.end, endHandler, false);
		this.slideBtn.addEventListener('mouseout', outHandler, false);

		function startHandler(e) {
			startX = e.pageX;
			_this.slideBtn.addEventListener(_this.event.move, moveHandler, false);

		}
		function moveHandler(e) {
			var x = e.pageX - startX;
			if (x <= endL && x >= 0) {
				nowX = x;
				this.style.transform = 'translate3d('+ x +'px, 0, 0)';
			}
		}
		function endHandler(e) {
			_this.slideBtn.removeEventListener(_this.event.move, moveHandler, false);
			var x = e.pageX - startX; 
			if (x >=endL - 1) {
				alert('success');
			} else {
				this.style.transform = 'translate3d(0, 0, 0)';
			}
		}
		function outHandler(e) {
			_this.slideBtn.removeEventListener(_this.event.move, moveHandler, false);
			this.style.transform = 'translate3d(0, 0, 0)';
		}
	}

var s2Unlock = new S2Unlock('.unlock-wrap', {
	hint: 'slide to unlock',
	slideBtn: '.slide-btn',
	btnColor: '#8dd',
	wrapColor: '#61a',
	slideImgSrc: 'arrow.png',
	wrapImgSrc: 'bg.png'
});
s2Unlock.init();
/*
var slideBtn = document.querySelector('.slide-btn');
var slideStart = false;
slideBtn.onmousedown = function(e) {
	slideStart = true;
}
slideBtn.onmousemove = function(e) {
	var x = e.pageX - 40 - 50;
	console.log(slideStart);
	if (slideStart && x <= 240 && x >= 0) {
		console.log(x);
		this.style.transform = 'translate3d('+ x +'px, 0, 0)';
	}
}
slideBtn.onmouseup = function(e) {
	slideStart = false;
	if (e.pageX - 40 - 50 >=239) {
		alert('success');
	} else {
		this.style.transform = 'translate3d(0, 0, 0)';
	}
}
slideBtn.addEventListener('touchstart', function(e) {
	slideStart = true;
})
slideBtn.addEventListener('touchmove', function(e) {
	var x = e.pageX - 40 - 50;
	console.log(slideStart);
	if (slideStart && x <= 240 && x >= 0) {
		console.log(x);
		this.style.transform = 'translate3d('+ x +'px, 0, 0)';
	}
})
slideBtn.addEventListener('touchend', function(e) {
	slideStart = false;
	if (e.pageX - 40 - 50 >=239) {
		alert('success');
	} else {
		this.style.transform = 'translate3d(0, 0, 0)';
	}
})*/