var Rentracks = {
	tracking_base_url : 'https://track.rentracks.com.vn',
	utm_source : 'rentracks',
	cookie_duration : 30,
	cookie_domain : '',
	sid : 0,
	reoccur : 1,
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
		this.utm_source = options.utm_source ? options.utm_source : 'rentracks';
		this.cookie_duration = options.cookie_duration ? options.cookie_duration : 30;
		this.cookie_domain = options.cookie_domain ? options.cookie_domain : window.location.hostname.replace(/^www\./i, "");
		this.sid = options.sid ? options.sid : 0;
		this.reoccur = options.reoccur ? options.reoccur : 1;
	},
	trackCookie: function(){
		var utm_source = this.getUrlParameter('utm_source');
		var rtsp = this.getUrlParameter('rtsp');
		if (utm_source){ this.setCookie('utm_source', utm_source, this.cookie_duration); }
		if (rtsp) { this.setCookie('_rtsp_sid_' + this.sid, rtsp, this.cookie_duration); }
	},
	trackConversion: function(data){	
		var conv_pid = data.pid ? data.pid : -1;
		var cinfo = data.cinfo ? data.cinfo : '';
		var price = data.price ? data.price : 0;
		var cname = data.cname ? data.cname : '';
		var ctel = data.ctel ? data.ctel : '';
		var cemail = data.cemail ? data.cemail : '';
		
		var _utm_source = this.getCookie('utm_source');
		var _rtsp = this.getCookie('_rtsp_sid_' + this.sid);
		if (_utm_source == this.utm_source && _rtsp && cinfo !== ''){
			var tracking_url = this.tracking_base_url + '/secure/es_extra.html' 
				+ '?pid=' + encodeURIComponent(conv_pid)
				+ '&cinfo=' + encodeURIComponent(cinfo) 
				+ '&rtsp=' + encodeURIComponent(_rtsp) 
				+ '&reoccur=' + encodeURIComponent(this.reoccur) 
				+ '&cname=' + encodeURIComponent(cname) 
				+ '&ctel=' + encodeURIComponent(ctel) 
				+ '&cemail=' + encodeURIComponent(cemail) 
				+ '&price=' + encodeURIComponent(price) 
				+ '&_method=rtsp_cookie';
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

// // Init, all pages
// Rentracks.init({'utm_source':'rentracks','sid':11});
// // Set cookie, every landing page
// Rentracks.trackCookie();


// // Record conversion, thank you page
// Rentracks.init({'utm_source':'rentracks','sid':11});
// var rt_data = {
// 	'pid' : 12345,
// 	'cinfo' : '{order_id}',
// 	'price' : {subtotal_price}
// }
// Rentracks.trackConversion(rt_data);
