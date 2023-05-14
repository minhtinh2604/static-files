const translation_messages = {
    en: {
        "search_voucher_placeholder": "Search...",
        "search": "Search"
    },
    vn: {
        "search_voucher_placeholder": "Tìm kiếm...",
        "search": "Tìm kiếm"
    }
}

/***** Application *****/
const i18n = new VueI18n({ locale: 'vn', fallbackLocale: 'vn', messages: translation_messages });
new Vue({
    el: '#appRTVoucher',
    i18n,
    created(){  
        document.body.classList.add('rtwrapper')
    },
    data () {
    	return {
            language: 'vn',
    		show_spinner : false,
            voucher_to_display: [],
    	}
	},
    methods:{
        openVoucherDetailModal(){
            bootstrapRT.Modal.getOrCreateInstance(document.getElementById('voucherDetailModal')).show()
        },






        copyVoucher(text, view_id){
            this.copyToClipboard(text, view_id)
        },
        copyToClipboard(text, view_id){
            var el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '')
            el.style = {position: 'absolute', left: '-9999px'}
            document.getElementById(view_id).appendChild(el)
            el.select()
            document.execCommand('copy')
            document.getElementById(view_id).removeChild(el)
        },
        gotoPage(link){
            window.open(link, '_blank');
        }
    }
});