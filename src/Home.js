import { Lightning, Utils } from '@lightningjs/sdk'
import TextField from './TextField.js'

export default class Home extends Lightning.Component {
  static _template() {
    return {
      Bg: {
        x: 0,
        y: 0,
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff228B22
      },
      Title: { x: 100, y: 400, text: { text: "Please Enter Home-Assistant IP:", fontSize: 50, textColor: 0xffffff00, } },
      URLTxt: { x: 1000, y: 500, text: { text: "", fontSize: 20, textColor: 0xffffff00, } },

      Txt1: {
        type: TextField,
        x: 900,
        y: 410,
        alpha: 1,
        signals: { select: true },
        argument: { value: "" }

      },
      Txt2: {
        type: TextField,
        x: 970,
        y: 410,
        alpha: 1,
        signals: { select: true },
        argument: { value: "" }
      },
      Txt3: {
        type: TextField,
        x: 1040,
        y: 410,
        alpha: 1,
        signals: { select: true },
        argument: { value: "" }
      },
      Txt4: {
        type: TextField,
        x: 1110,
        y: 410,
        alpha: 1,
        signals: { select: true },
        argument: { value: "" }

      },
      Txt5: {
        type: TextField,
        x: 1180,
        y: 410,
        alpha: 1,
        signals: { select: true },
        argument: { value: "" }
      },

    }
  }
  _init() { }
  _construct() {
    this.txtIndex = 1;
    this.ipValue=""
  }
  _setup() {
    this._setState('Txt1')
  }
  update(item) {
    if (item.evt == 'keydown') {
      this.urlUpdate();
    } else if (item.evt == 'left') {
      this.txtIndex++;
      this.txtFocus();
    } else if (item.evt == 'right') {
      this.txtIndex--;
      this.txtFocus();
    }else if (item.evt == 'enter') {
      this.signal('select', { item: this.ipValue, evt:'enter' })
    }
  }
  
  txtFocus() {
    if (this.txtIndex > 5) this.txtIndex = 1;
    if (this.txtIndex < 1) this.txtIndex = 5;
    let state = 'Txt' + this.txtIndex;
    this._setState(state);
  }

  urlUpdate() {
    this.ipValue = "http://" + this.tag("Txt1").getValue() + "." + this.tag("Txt2").getValue() + "." + this.tag("Txt3").getValue() + "." + this.tag("Txt4").getValue() + ":" + this.tag("Txt5").getValue();
    this.tag('URLTxt').text = this.ipValue
  }

  static _states() {
    return [
      class Txt1 extends this {
        _getFocused() {
          return this.tag("Txt1")
        }
        select(item) {
          this.update(item)
        }
      },
      class Txt2 extends this {
        _getFocused() {
          return this.tag("Txt2")
        }
        select(item) {
          this.update(item)
        }
      },
      class Txt3 extends this {
        _getFocused() {
          return this.tag("Txt3")
        }
        select(item) {
          this.update(item)
        }
      },
      class Txt4 extends this {
        _getFocused() {
          return this.tag("Txt4")
        }
        select(item) {
          this.update(item)
        }
      },
      class Txt5 extends this {
        _getFocused() {
          return this.tag("Txt5")
        }
        select(item) {
          this.update(item)
        }
      },

    ]
  }

}