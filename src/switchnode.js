import { Lightning, Utils } from '@lightningjs/sdk'

export default class Switchnode extends Lightning.Component {
    _init(){
        this.patch({
            Bg: {
                rect: true,
                w: 900,
                h: 40,
                color: 0xff228B22
              },  
              Mark:{
                rect: true,
                w: 900,
                h: 40,
                alpha:(this.argument.state=='on'?1:0),
                color: 0xffD2691E
              },      
            EntIdTxt: { x: 0, y: 0, text: { text: this.argument.endid, fontSize: 20 ,  textColor: 0xff000000,} },
            StateTxt: { x: 550, y: 0, text: { text: this.argument.state, fontSize: 20 ,  textColor: 0xff000000,} },
            ToggleTxt:{ rect:this.argument.toggle,x: 600, y: 0,w:100,h:40, color: 0xff000000},

        });
    }
    _focus() {
        this.tag("Bg").patch({color: 0xff233aab});
      }
    _unfocus() {
        this.tag("Bg").patch({color: 0xff228B22});
    }

    update(state){
        if(!state){
        this.tag("Mark").alpha =1;
        }else{
        this.tag("Mark").alpha =0;
        }
    }
    _construct() {}
   

}