import { Lightning, Utils } from '@lightningjs/sdk'

export default class TextField extends Lightning.Component {
  static _template() {
    return {
      
    Txtbg: {
      x:0,
      y:0,
      rect: true,
      w: 60,
      h: 40,
      color: 0xff00dddd
    },
    Txt: { x: 0, y: 0, text: { text: "", fontSize: 20 ,  textColor: 0xff000000,} }
    }
  }

  _init(){
    this.patch({
      Txt: { x: 0, y: 0, text: { text: this.argument.value, fontSize: 20 ,  textColor: 0xff000000,} }
    });
    this.value=this.argument.value;

  }

  _focus() {
    this.tag("Txtbg").patch({color: 0xffdddddd});
  }
_unfocus() {
    this.tag("Txtbg").patch({color: 0xff00dddd});
}
getValue(){
  return this.value;
}
    _construct() {
      this.value=""
    }

    _captureKey(evt) {
      if((evt.key>='0' && evt.key<='9')){
       let str = evt.key;
       let txt = ""+this.tag('Txt').__texture.text;
       this.value = txt+str;
       this.tag('Txt').text = this.value;
       this.signal('select', { item: this.tag('Txt').text, evt:'keydown' })
      }
      if(evt.key=='ArrowRight'){
        this.signal('select', { item: "", evt:'left' })
      }
      if(evt.key=='ArrowLeft'){
      this.signal('select', { item: "", evt:'right' })        
      }
      if(evt.key=='Backspace'){
        this.value = "";
        this.tag('Txt').text = this.value;
        this.signal('select', { item: "", evt:'Backspace' })          
      }
      if(evt.key=='Enter'){
        this.signal('select', { item: "", evt:'enter' })        
      }
      return true
    }

}