import Vue from 'vue'

//引入buefy组件库
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

//引入element-ui组件
//梁田的引入
import { DatePicker, Container, Form, Input, FormItem, Checkbox, CheckboxGroup, Option, Col, Select, Radio, RadioGroup, InputNumber, Header, Aside, Main, Table, TableColumn} from 'element-ui'
//我的引入
import { Avatar, Badge, Button, Image, Dialog, Tabs, TabPane, Upload, MessageBox, Message, ButtonGroup, Tooltip, Row} from 'element-ui'

const UIComponents = {
  init: function(){
    Vue.use(Buefy);

    Vue.use(Avatar);
    Vue.use(Badge);
    Vue.use(Button);
    Vue.use(Image);
    Vue.use(Dialog);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Upload);
    Vue.use(ButtonGroup);
    Vue.use(Tooltip);
    Vue.use(Row);
    Vue.prototype.$confirm=MessageBox.confirm;
    Vue.prototype.$message = Message;
    
    Vue.use(DatePicker);
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(FormItem);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Option);
    Vue.use(Col);
    Vue.use(Select);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(InputNumber);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Container);
    Vue.use(Table);
    Vue.use(TableColumn);
    
    //日期格式化
    Date.prototype.format = function(fmt) { 
      var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S" : this.getMilliseconds()             //毫秒 
      }; 
      if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      }
      for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
      }
      return fmt; 
    }
  },
}

//对外暴露
export default UIComponents