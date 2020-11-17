import { Lightning, Utils } from '@lightningjs/sdk'

export default class Ms extends Lightning.Component {
    _init(){
        this.patch({
            Bg: {
                rect: true,
                w: 900,
                h: 40,
                color: 0xff228B22,
                alpha:0
              },  
       
        });
    }
    _construct() {}
   

}