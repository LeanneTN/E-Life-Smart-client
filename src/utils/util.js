let _util = {
    //检验参数是否合格：
    checkValue: function(fieldType,fieldValue){
        fieldValue=fieldValue.trim(fieldValue)
        if(fieldType==='require'){
            return !!fieldValue          //双重否定，
        }
    },
};

//对外暴露
export default _util