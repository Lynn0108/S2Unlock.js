# S2Unlock.js

一个简单的“滑动解锁”javaScript插件，可以使用背景色或是使用图片。pc端和手机端都可以使用。

A simple 'slide to unlock' javaScript plugin, both work with background color or background image. You can use it at pc or phone.

## How to use
Download `S2Unlock.css` and `S2Unlock.min.js` in dist folder, then include this two in your HTML file.

#### HTML
```hmtl
<div class="unlock-wrap">
	<div class="slide-btn"></div>
	<p class="hint">slide to unlock</p>  <!--if you need a hint-->
</div>
```
#### JS
```js
<script>
	var s2Unlock = new S2Unlock('.unlock-wrap', {
		slideButton: '.slide-btn',
	});
</script>
```
## Option
|name|description|example|
|:---|:---|:---|
|slideButton|滑块元素|'.slide-btn'|
|width|边框宽度|'300'|
|height|边框高度|'50'|
|btnColor|滑块背景色|'#8dd'|
|wrapColor|边框色|'#61a'|
|slideImgSrc|滑块图片地址，会使btnColor失效|'arrow.png'|
|wrapImgSrc|边框底图地址，会使height，wrapColor失效|'bg.png'|
|callback|成功的回调函数|function() {alert('success');}|

## Demo
You can see a simple demo in [here](http://htmlpreview.github.io/?https://github.com/Lynn0108/S2Unlock.js/blob/master/demo/demo.html).
