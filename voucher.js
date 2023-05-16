const RT_pagination_template = {
    template: `
        <nav>
            <ul class="pagination justify-content-start mb-0">
                <li :class="{ 'page-item disabled': isInFirstPage == true, 'page-item': isInFirstPage == false }">
                    <a class="page-link" href="#" aria-label="First" @click="onClickFirstPage"><span aria-hidden="true">&laquo;</span></a>
                </li>
                <li :class="{ 'page-item disabled': isInFirstPage == true, 'page-item': isInFirstPage == false }">
                    <a class="page-link" href="#" aria-label="Previous" @click="onClickPreviousPage"><span aria-hidden="true">&#8249;</span></a>
                </li>
                <li v-for="page in pages" :key="page.name" :class="{ 'page-item disabled': page.isDisabled == true, 'page-item': page.isDisabled == false }">
                    <a :class="{ 'page-link active': isPageActive(page.name) == true, 'page-link': isPageActive(page.name) == false }" href="#" @click="onClickPage(page.name)">{{ page.name }}</a>
                </li>
                <li :class="{ 'page-item disabled': isInLastPage == true, 'page-item': isInLastPage == false }">
                    <a class="page-link" href="#" aria-label="Next" @click="onClickNextPage"><span aria-hidden="true">&#8250;</span></a>
                </li>
                <li :class="{ 'page-item disabled': isInLastPage == true, 'page-item': isInLastPage == false }">
                    <a class="page-link" href="#" aria-label="Last" @click="onClickLastPage"><span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>
        </nav>
    `,
    props: {
        maxVisibleButtons: { type: Number, required: false, default: 3 },    
        totalPages: { type: Number, required: true },
        perPage: { type: Number, required: true },
        currentPage: { type: Number, required: true }
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1) { return 1; }
            // When on the last page
            if (this.currentPage === this.totalPages) {
                const start = this.totalPages - (this.maxVisibleButtons - 1);
                if (start === 0) { return 1; } else { return start; }
            }
            // When inbetween
            return this.currentPage - 1;
        },
        endPage() { return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); },
        pages() {
            const range = [];
            for (let i = this.startPage; i <= this.endPage; i++) { range.push({ name: i, isDisabled: i === this.currentPage }); }
            return range;
        },
        isInFirstPage() { return this.currentPage === 1; },
        isInLastPage() { return this.currentPage === this.totalPages; }
    },
    methods: {
        onClickFirstPage() { this.$emit('pagechanged', 1); },
        onClickPreviousPage() { this.$emit('pagechanged', this.currentPage - 1); },
        onClickPage(page) { this.$emit('pagechanged', page); },
        onClickNextPage() { this.$emit('pagechanged', this.currentPage + 1); },
        onClickLastPage() { this.$emit('pagechanged', this.totalPages); },
        isPageActive(page) { return this.currentPage === page; }
    }
};

const RT_voucher_index_template = {
template: `
    <div class="container voucher-container">
            <div v-if="show_spinner === true" class="text-center mt-3">
                <div class="spinner-border voucher-spinner-border" role="status"><span class="visually-hidden"></span></div>
            </div>
            <div class="px-3 pt-4">
                <div class="search-title">{{$t('widget_title')}}</div>
            </div>
            <div class="block mt-3 p-3">
              <div class="input-group">
                <input type="text" class="form-control input-search" id="input-search" :placeholder="$t('search_voucher_placeholder')">
                <button class="btn button-search px-3" type="button" id="button-search">
                    {{$t('search')}} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search ms-1" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></button>
              </div>
            </div>
            <div class="block mt-2">
                <div class="px-3 pt-3">
                    {{$t('voucher_list')}}
                </div>
                <div class="p-3">
                    <div style="padding: 0.5rem; background-color: rgb(235, 235, 235); border-radius: 4px;">
                        <div class="voucher-wrapper">
                            <div v-for="index in 12" :key="index" :class="'voucher-item h-100 voucher-item-'+index">
                                <div class="d-flex flex-row h-100">
                                    <div style="margin-right: 0.5rem;">
                                        <div class="voucher-image-wrapper">
                                            <img src="https://cf.shopee.vn/file/5f1a3db0c508295ec67236c01bf13045" class="voucher-image">
                                        </div>
                                    </div>
                                    <div class="w-100">
                                        <div class="voucher-name" @click="openVoucherDetailModal()">Tiki - Mua hàng online giá tốt, hàng chuẩn, ship nhanh - Tiki - Mua hàng online giá tốt, hàng chuẩn, ship nhanh</div>
                                        <div class="mt-3 voucher-expired d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>{{$t('expiry_date')}}: 01-02-2050 23:59</div>
                                        <!-- <div class="mt-2 voucher-remain d-flex align-items-center">
                                            Còn lại: 
                                        </div> -->
                                        <div class="mt-3">
                                            <div class="d-flex flex-row justify-content-between align-items-end">
                                                <div class="me-2"><span class="badge voucher-label">Shopee</span></div>
                                                <button type="button" class="btn btn-sm btn-copy-code" @click="openVoucherDetailModal()">{{$t('copy_code')}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                  
                    </div>
                    <Pagination_template class="mt-2" :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange"></Pagination_template>
                </div>

                <!-- Voucher Detail Modal -->
                <div class="modal fade" id="voucherDetailModal" rt-data-bs-keyboard="false" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content border-0">
                        <div class="modal-header border-0 align-items-start">
                            <div class="w-100">
                                <div class="d-flex flex-row">
                                    <div>
                                        <div class="voucher-image-wrapper">
                                            <img src="https://cf.shopee.vn/file/5f1a3db0c508295ec67236c01bf13045" class="voucher-image">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="ms-2 fw-bold title"> [Nạp điện thoại]-Nhập mã SPPDTA5A Giảm ngay 2500 cho đơn từ 95000 </div>
                                        <div class="ms-2 mt-2"><span class="badge voucher-label">Shopee</span></div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn-close" rt-data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="px-3">
                            <div class="line"></div>
                        </div>
                        <div class="modal-body pt-0">
                            <div class="my-2 voucher-expired d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>{{$t('expiry_date')}}: 01-02-2050 23:59</div>
                            <div class="mt-3 voucher-detail-title">
                                {{$t('voucher_description')}}
                            </div>
                            <div class="mt-2 voucher-detail">
                                This is some placeholder content to show a vertically centered modal. We've added some extra copy here to show how vertically centering the modal works when combined with scrollable modals. We also use some repeated line breaks to quickly extend the height of the content, thereby triggering the scrolling. When content becomes longer than the predefined max-height of modal, content will be cropped and scrollable within the modal.
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <div class="input-group input-group-copy-code">
                                <input type="text" class="form-control voucher-code text-center" disabled value="FSV-505453823524864">
                                <button class="btn btn-outline-secondary btn-copy-code px-4" type="button">{{$t('copy')}}</button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    `,
    props: [],
    data: () => ({
        show_spinner : false,
        voucher_to_display: [],
        currentPage: 1,
        totalPages: 10,
        perPage: 10,
    }),
    mounted(){

    },
    methods:{
        openVoucherDetailModal(){
            bootstrapRT.Modal.getOrCreateInstance(document.getElementById('voucherDetailModal')).show()
        },

        onPageChange(page) {
            console.log(page)
            this.currentPage = page;
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
        gotoPage(link){ window.open(link, '_blank'); },
    }
};

const rt_voucher_translation_messages = {
    en: {
        "widget_title": "Voucher",
        "search_voucher_placeholder": "Search...",
        "search": "Search", 
        "voucher_list": "VOUCHER",
        "copy": "Copy",
        "copy_code": "Copy code",
        "voucher_description": "Description",
        "expiry_date": "Exp. date"
    },
    vn: {
        "widget_title": "Tìm mã giảm giá",
        "search_voucher_placeholder": "Tìm kiếm...",
        "search": "Tìm kiếm",
        "voucher_list": "DANH SÁCH VOUCHER",
        "copy": "Copy",
        "copy_code": "Lấy code",
        "voucher_description": "Mô tả chi tiết",
        "expiry_date": "HSD"
    }
}

/***** Application *****/
const rt_voucher_i18n = new VueI18n({ locale: 'vn', fallbackLocale: 'en', messages: rt_voucher_translation_messages });
Vue.component("Index_template", RT_voucher_index_template);
Vue.component("Pagination_template", RT_pagination_template);
new Vue({
    el: '#appRTVoucher',
    i18n: rt_voucher_i18n,
    created(){  
        document.body.classList.add('rtwrapper')
        this.load_data()
    },
    data: () => ({
        language: data_language,
        voucher_to_display: [],
    }),
    methods:{
        load_data(){
            this.$i18n.locale = this.language
            document.querySelector("body .rt2023").style = " --custom-color: " + data_style_color + ";"
        },       
    }
});


/***** Remove Diacritics *****/
function removeDiacritics(e){for(var t=[{base:"A",letters:"AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",letters:"Ꜳ"},{base:"AE",letters:"ÆǼǢ"},{base:"AO",letters:"Ꜵ"},{base:"AU",letters:"Ꜷ"},{base:"AV",letters:"ꜸꜺ"},{base:"AY",letters:"Ꜽ"},{base:"B",letters:"BⒷＢḂḄḆɃƂƁ"},{base:"C",letters:"CⒸＣĆĈĊČÇḈƇȻꜾ"},{base:"D",letters:"DⒹＤḊĎḌḐḒḎĐƋƊƉꝹÐ"},{base:"DZ",letters:"ǱǄ"},{base:"Dz",letters:"ǲǅ"},{base:"E",letters:"EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"},{base:"F",letters:"FⒻＦḞƑꝻ"},{base:"G",letters:"GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"},{base:"H",letters:"HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",letters:"IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",letters:"JⒿＪĴɈ"},{base:"K",letters:"KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",letters:"LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",letters:"Ǉ"},{base:"Lj",letters:"ǈ"},{base:"M",letters:"MⓂＭḾṀṂⱮƜ"},{base:"N",letters:"NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"},{base:"NJ",letters:"Ǌ"},{base:"Nj",letters:"ǋ"},{base:"O",letters:"OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OI",letters:"Ƣ"},{base:"OO",letters:"Ꝏ"},{base:"OU",letters:"Ȣ"},{base:"OE",letters:"Œ"},{base:"oe",letters:"œ"},{base:"P",letters:"PⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",letters:"QⓆＱꝖꝘɊ"},{base:"R",letters:"RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",letters:"SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",letters:"TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"TZ",letters:"Ꜩ"},{base:"U",letters:"UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",letters:"VⓋＶṼṾƲꝞɅ"},{base:"VY",letters:"Ꝡ"},{base:"W",letters:"WⓌＷẀẂŴẆẄẈⱲ"},{base:"X",letters:"XⓍＸẊẌ"},{base:"Y",letters:"YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",letters:"ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",letters:"aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"},{base:"aa",letters:"ꜳ"},{base:"ae",letters:"æǽǣ"},{base:"ao",letters:"ꜵ"},{base:"au",letters:"ꜷ"},{base:"av",letters:"ꜹꜻ"},{base:"ay",letters:"ꜽ"},{base:"b",letters:"bⓑｂḃḅḇƀƃɓ"},{base:"c",letters:"cⓒｃćĉċčçḉƈȼꜿↄ"},{base:"d",letters:"dⓓｄḋďḍḑḓḏđƌɖɗꝺ"},{base:"dz",letters:"ǳǆ"},{base:"e",letters:"eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"},{base:"f",letters:"fⓕｆḟƒꝼ"},{base:"g",letters:"gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"},{base:"h",letters:"hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",letters:"ƕ"},{base:"i",letters:"iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",letters:"jⓙｊĵǰɉ"},{base:"k",letters:"kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",letters:"lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"},{base:"lj",letters:"ǉ"},{base:"m",letters:"mⓜｍḿṁṃɱɯ"},{base:"n",letters:"nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"},{base:"nj",letters:"ǌ"},{base:"o",letters:"oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"},{base:"oi",letters:"ƣ"},{base:"ou",letters:"ȣ"},{base:"oo",letters:"ꝏ"},{base:"p",letters:"pⓟｐṕṗƥᵽꝑꝓꝕ"},{base:"q",letters:"qⓠｑɋꝗꝙ"},{base:"r",letters:"rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",letters:"sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"},{base:"t",letters:"tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"tz",letters:"ꜩ"},{base:"u",letters:"uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",letters:"vⓥｖṽṿʋꝟʌ"},{base:"vy",letters:"ꝡ"},{base:"w",letters:"wⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",letters:"xⓧｘẋẍ"},{base:"y",letters:"yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",letters:"zⓩｚźẑżžẓẕƶȥɀⱬꝣ"}],s={},a=0;a<t.length;a++)for(var r=t[a].letters,l=0;l<r.length;l++)s[r[l]]=t[a].base;return e.replace(/[^\u0000-\u007E]/g,(function(e){return s[e]||e}))}
