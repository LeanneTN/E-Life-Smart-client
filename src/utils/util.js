let _util = {
    //检验参数是否合格：
    checkValue: function(fieldType,fieldValue){
        fieldValue=fieldValue.trim(fieldValue)
        if(fieldType==='require'){
            return !!fieldValue          //双重否定，
        }
    },
    //校验手机号码
    isPhone(phone) {
        let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(phone)) {
            return false;
        } else {
            return true;
        }
    },
};

//对外暴露
export default _util