import { Lightning, Utils } from '@lightningjs/sdk'
import SwitchNode from './switchnode.js'

export default class HomeAssistant extends Lightning.Component {
    
  static _template() {
    return {
        
    }
  }
    _init(){
        let index =0;
        this.index = 0
        this.dataCount = Object.keys(this.argument.data).length;

        Object.keys(this.argument.data).sort().forEach(entId => {
        let toggleDisplay =false; 
        if (["switch", "light", "input_boolean"].includes(entId.split(".", 1)[0]) ){
            toggleDisplay = true;
        } 
        this.patch({
            ["SwitchNode"+index]: {
                type: SwitchNode,
                y:index*50,
                alpha: 1,
                signals: { select: true },
                argument: {endid:entId,state:this.argument.data[entId].state,toggle:toggleDisplay}
              }
          });
          index++;
        });
    }

    _getFocused() {
        return this.children[this.index]
      }

    _handleDown() {
        if((this.dataCount-1)>this.index){
        this.index++;
       }
    }

    _handleUp() {
        if(this.index>0) {  this.index--; }        
    }

    _handleEnter() {
        // if(this.children[this.index].argument.toggle){
        this.signal('select', { item: this.children[this.index].argument.endid})
        let state =this.children[this.index].argument.state=='on'?true:false;
        this.children[this.index].update(state);
        // }

    }

}