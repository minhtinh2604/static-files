var Rentracks = {
	tracking_base_url : 'https://track.rentracks.com.vn',
	utm_source : 'rentracks',
	source_param : 'utm_source',
	click_id_param : 'rtsp',
	cookie_duration : 30,
	cookie_domain : '',
	sid : 0,
	getUrlParameter: function(name, url) { 
		if (!url) url = window.location.href;
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( url );
		return results == null ? null : results[1];
	},
	setCookie: function(name, value, days) {
		var d = new Date();
		d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
		var ee = "expires=" + d.toUTCString();
		var cookie_domain = this.cookie_domain;
		document.cookie = name + "=" + value + "; " + ee + "; SameSite=None; Secure; domain=" + cookie_domain + "; path=/";
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) == ' ') c = c.substring(1); if (c.indexOf(name) == 0) return c.substring(name.length, c.length); }
		return null;
	},
	init: function(options){
		this.source_param = options.source_param ? options.source_param : this.source_param;
		this.click_id_param = options.click_id_param ? options.click_id_param : this.click_id_param;
		this.utm_source = options.utm_source ? options.utm_source : this.utm_source;
		this.cookie_duration = options.cookie_duration ? options.cookie_duration : this.cookie_duration;
		this.cookie_domain = options.cookie_domain ? options.cookie_domain : window.location.hostname.replace(/^www\./i, "");
		this.sid = options.sid ? options.sid : this.sid;
	},
	trackCookie: function(){
		var utm_source = this.getUrlParameter(this.source_param);
		var rtsp = this.getUrlParameter(this.click_id_param);
		if (utm_source){ this.setCookie('utm_source', utm_source, this.cookie_duration); }
		if (rtsp) { this.setCookie('_rtsp_sid_' + this.sid, rtsp, this.cookie_duration); }
	},
	trackConversion: function(data){	
		var cinfo = data.cinfo ? data.cinfo : '';
		var price = data.price ? data.price : 0;
		var cname = data.cname ? data.cname : '';
		var ctel = data.ctel ? data.ctel : '';
		var cemail = data.cemail ? data.cemail : '';
		
		var _utm_source = this.getCookie('utm_source');
		var _rtsp = this.getCookie('_rtsp_sid_' + this.sid);
		data['_utm_source'] = _utm_source;
		data['_rtsp'] = _rtsp;
		if (_utm_source == this.utm_source && _rtsp && cinfo !== ''){
			var tracking_url = this.tracking_base_url + '/secure/es.html' 
				+ '?sid=' + encodeURIComponent(this.sid) 
				+ '&pid=' + encodeURIComponent(data.pid) 
				+ '&rtsp=' + encodeURIComponent(_rtsp) 
				+ '&cinfo=' + encodeURIComponent(cinfo)  
				+ '&price=' + encodeURIComponent(price) 
				+ '&cname=' + encodeURIComponent(cname) 
				+ '&ctel=' + encodeURIComponent(ctel) 
				+ '&cemail=' + encodeURIComponent(cemail) 
				+ '&quantity=1&reward=-1&_method=rtsp_cookie';
			var rt_pixel = document.createElement('rt_pixel');
			rt_pixel.style.display = 'none'; rt_pixel.innerHTML = '<img src="' + tracking_url + '" width="1" height="1">';
			document.body.appendChild(rt_pixel);
			console.log("[RT] Pixel tracking url: " + tracking_url);
		}else{
			console.log('[RT] No conversion.');
			console.log(data);
		}
	}
};

// Parameters:
// utm_source=rentracks&rtsp=<%%SOCKETCODE%%>

// // Init, all pages
// Rentracks.init({'utm_source':'rentracks','sid':11});
// // Set cookie, every landing page
// Rentracks.trackCookie();

// // Record conversion, thank you page
// var rt_data = {
// 	'pid' : 12345,
// 	'cinfo' : '{order_id}',
// 	'price' : {subtotal_price},
// 	'cname' : '',
// 	'cemail' : '',
// 	'ctel' : ''
// }
// Rentracks.trackConversion(rt_data);
