import Confirm from './confirm';
export default {
    install(Vue) {
        let ConfirmObj=Vue.extend(Confirm);
        Vue.prototype.$confirm=function (msg,btns) {
            let ConfirmInit=new ConfirmObj().$mount(document.createElement("div"));
            document.body.appendChild(ConfirmInit.$el);
            // console.log(ConfirmInit);
            ConfirmInit.msg =msg;
            if (btns && btns.length>0){
                ConfirmInit.btns=btns;
            }
        }
    }
}