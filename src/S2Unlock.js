/*
 * S2Unlock v1.0.0
 *
 * A simple 'slide to unlock' javascript plugin
 * Both picture and background color are valid 
 * 
 * https://github.com/Lynn0108/S2Unlock.js
 * 
 * Author: Rui Liao 
 * 
 * Released on: Sep. 26, 2017
 */
(function(window){
	var isPC = IsPC();
	function IsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    console.log(userAgentInfo);
	    return flag;
	}
	function S2Unlock(el, option) {
		var _this = this;
		// outside wrap
		this.wrap = document.querySelector(el);
		this.width = option.width || '300';
		this.height = option.height || '50';
		this.wrapImg = option.wrapImgSrc || '';
		this.wrapColor = option.wrapColor || '#089';
		// slide button
		this.slideBtn = this.wrap.querySelector(option.slideButton);
		this.slideImg = option.slideImgSrc || '';
		this.btnColor = option.btnColor || '#089';	
		// this.hint = option.hint || '';
		this.callback = typeof option.callback == 'function' ? option.callback : this.defaultCallback;
		// this.isPC = false;
		this.pcEvent = {
			start: 'mousedown',
			move: 'mousemove',
			end: 'mouseup'
		};
		this.phoneEvent = {
			start: 'touchstart',
			move: 'touchmove',
			end: 'touchend'
		}
		this.init();
	}
	S2Unlock.prototype = {
		constructor: S2Unlock,
		init: function() {
			if (!this.wrap || !this.slideBtn) {
				return ;
			}
			// this.initEvent();
			this.initStyle();
		},
		initStyle: function() {
			this.wrap.style.width = this.width + 'px';
			var wrapImg = this.wrapImg;
			var slideImg = this.slideImg;
			if (wrapImg || slideImg) {
				var _this = this;
				if (wrapImg) {
					this.wrap.style.border = 'none';
					this.setBgImage(this.wrap, wrapImg);
				} else {
					this.wrapStyle();
				}
				if (slideImg) {
					this.setBgImage(this.slideBtn, slideImg);
				} else {
					this.slideStyle();
				}
				var img = new Image();
				img.src = slideImg ? slideImg : wrapImg;
				img.onload = function() {
					// _this.width = _this.wrap.offsetWidth;
					_this.slideW = _this.slideBtn.offsetWidth;
					_this.hintStyle.call(_this);
					_this.prepare.call(_this);
				}
			} else {
				this.wrapStyle();
				this.slideStyle();
				this.hintStyle();
				this.prepare();
			}
		},
		wrapStyle: function() {
			this.wrap.style.borderColor = this.wrapColor;
			this.wrap.style.height = this.height + 'px';
		},
		slideStyle: function() {
			this.slideBtn.style.background = this.btnColor;
			this.slideW = this.width / 5;
			this.slideBtn.style.width = this.slideW + 'px';
		},
		hintStyle: function() {
			var hint = null;
			if (hint = this.wrap.querySelector('.hint')) {
				var height = this.wrap.offsetHeight;
				hint.style.lineHeight = height + 'px';
				hint.style.left = this.slideW + 'px';
			}
		},
		setBgImage: function(dom, imgSrc) {
			var imgDom = document.createElement("img");
			imgDom.setAttribute('src', imgSrc);
			dom.style.backgroundImage = 'url("' + imgSrc + '")';
			dom.appendChild(imgDom);
		},
		prepare: function() {
			this.endL = this.width - this.slideW;
			this.bindEvent();
		},
		initEvent: function() {
			this.isPC = IsPC();
		},
		bindEvent: function() {
			var _this = this;
			var endL = this.endL;
			var startX = 0;
			var nowX = 0;
			var startE = isPC ? this.pcEvent.start : this.phoneEvent.start;
			var moveE = isPC ? this.pcEvent.move : this.phoneEvent.move;
			var endE = isPC ? this.pcEvent.end : this.phoneEvent.end;
			this.slideBtn.addEventListener(startE, startHandler, false);
			// this.slideBtn.addEventListener(_this.event.move, moveHandler, false);
			this.slideBtn.addEventListener(endE, endHandler, false);
			this.slideBtn.addEventListener('mouseout', outHandler, false);

			function startHandler(e) {
				startX = e.pageX || e.touches[0].pageX;
				_this.slideBtn.addEventListener(moveE, moveHandler, false);

			}
			function moveHandler(e) {
				var x = e.pageX || e.touches[0].pageX;
				x -= startX;
				if (x <= endL && x >= 0) {
					nowX = x;
					this.style.transform = 'translate3d('+ x +'px, 0, 0)';
				}
			}
			function endHandler(e) {
				_this.slideBtn.removeEventListener(moveE, moveHandler, false);
				var x = e.pageX || e.changedTouches[0].pageX;
				x -= startX;
				if (x >=endL - 1) {
					_this.callback();
				} else {
					this.style.transform = 'translate3d(0, 0, 0)';
				}
				if (!_this.isPC) {
					this.style.transform = 'translate3d(0, 0, 0)';
				}
			}
			function outHandler(e) {
				_this.slideBtn.removeEventListener(moveE, moveHandler, false);
				this.style.transform = 'translate3d(0, 0, 0)';
			}
		},
		defaultCallback: function() {
			alert('success');
		}
	}
	window.S2Unlock = S2Unlock;
})(window);

