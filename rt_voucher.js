var base_url = "https://mocki.io";
var api_uri = "/v1/000a71d1-e7e2-44a7-88ce-73ec884a64ee";

var current_src = document.currentScript.src;
var bootstrap_css = current_src.replace("rt_voucher.js", "bootstrap.css");
var voucher_css = current_src.replace("rt_voucher.js", "voucher.css");
var voucher_js = current_src.replace("rt_voucher.js", "voucher.js");

var data_style_color = document.getElementById('rt_voucher_script').getAttribute('data-style-color')
var data_limit = document.getElementById('rt_voucher_script').getAttribute('data-limit')
var data_coupon_row = document.getElementById('rt_voucher_script').getAttribute('data-row')
var data_language = document.getElementById('rt_voucher_script').getAttribute('data-language')

if (!data_style_color) { data_style_color = '#673AB7' }
if (!data_limit) { data_limit = 10 }
if (!data_coupon_row || data_coupon_row > 3 || data_coupon_row < 1) { data_coupon_row = 3 }
if (!data_language) { data_language = "en" }

var timestamp = Date.now()
var head  = document.getElementsByTagName('head')[0]; 

var link = document.createElement('link'); 
link.href = bootstrap_css + '?t=' + timestamp; 
link.rel = 'stylesheet'; 
link.type = 'text/css'; 
link.media = 'all'; 
head.appendChild(link);

var body  = document.getElementsByTagName('body')[0]; 
var link2 = document.createElement('link'); 
link2.href = voucher_css + '?t=' + timestamp; 
link2.rel = 'stylesheet'; 
link2.type = 'text/css'; 
link2.media = 'all'; 
body.appendChild(link2);

var script = document.createElement('script'); 
script.src = voucher_js + '?t=' + timestamp;
script.type = 'text/javascript';
body.appendChild(script);
