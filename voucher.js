const Index_template = {
template: `
    <div class="container voucher-container">
            <!-- <div class="text-center mt-3">
                <div class="spinner-border voucher-spinner-border" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div> -->
            <div class="px-3 pt-4">
                <div class="search-title">Tìm mã giảm giá</div>
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
                    DANH SÁCH COUPON
                </div>
                <div class="p-3">
                    <div style="padding: 0.5rem; background-color: rgb(225, 225, 225); border-radius: 4px;">
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
                                        <div class="mt-3 voucher-expired d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg> HSD: 01-02-2050 23:59</div>
                                        <!-- <div class="mt-2 voucher-remain d-flex align-items-center">
                                            Còn lại: 
                                        </div> -->
                                        <div class="mt-3">
                                            <div class="d-flex flex-row justify-content-between align-items-end">
                                                <div class="me-2"><span class="badge voucher-label">Shopee</span></div>
                                                <button type="button" class="btn btn-sm btn-copy-code" @click="openVoucherDetailModal()">Lấy code</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                  
                    </div>
                    <nav>
                      <ul class="pagination mt-2 mb-0">
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
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
                            <div class="my-2 voucher-expired d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>HSD: 01-02-2050 23:59</div>
                            <div class="mt-3" style="font-size:14px; font-weight: 700;">
                                Mô tả chi tiết
                            </div>
                            <div class="mt-2 voucher-detail">
                                This is some placeholder content to show a vertically centered modal. We've added some extra copy here to show how vertically centering the modal works when combined with scrollable modals. We also use some repeated line breaks to quickly extend the height of the content, thereby triggering the scrolling. When content becomes longer than the predefined max-height of modal, content will be cropped and scrollable within the modal.
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <div class="input-group">
                                <input type="text" class="form-control w-50 text-center" disabled value="FSV-505453823524864-505453823524864-505453823524864">
                                <button class="btn btn-outline-secondary btn-copy-code w-50" type="button">Sao chép</button>
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

    }),
    mounted(){

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
};

const rt_voucher_translation_messages = {
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
const rt_voucher_i18n = new VueI18n({ locale: 'vn', fallbackLocale: 'vn', messages: rt_voucher_translation_messages });
Vue.component("Index_template", Index_template);
new Vue({
    el: '#appRTVoucher',
    i18n: rt_voucher_i18n,
    created(){  
        document.body.classList.add('rtwrapper')
    },
    data: () => ({
        language: 'vn',
    	show_spinner : false,
        voucher_to_display: [],
    }),
    methods:{
        load_data(){

        },       
    }
});
