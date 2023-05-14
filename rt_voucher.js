var base_url = "https://mocki.io";
var api_uri = "/v1/000a71d1-e7e2-44a7-88ce-73ec884a64ee";

var current_src = document.currentScript.src;
var bootstrap_css = current_src.replace("rt_voucher.js", "bootstrap.css");
var voucher_css = current_src.replace("rt_voucher.js", "voucher.css");
var voucher_js = current_src.replace("rt_voucher.js", "voucher.js");


var head  = document.getElementsByTagName('head')[0]; 
var link = document.createElement('link'); 
link.href = bootstrap_css; 
link.rel = 'stylesheet'; 
link.type = 'text/css'; 
link.media = 'all'; 
head.appendChild(link);

var head  = document.getElementsByTagName('head')[0]; 
var link2 = document.createElement('link'); 
link2.href = voucher_css; 
link2.rel = 'stylesheet'; 
link2.type = 'text/css'; 
link2.media = 'all'; 
head.appendChild(link2);

var head  = document.getElementsByTagName('body')[0]; 
var script = document.createElement('script'); 
script.src = voucher_js;
script.type = 'text/javascript';
head.appendChild(script);