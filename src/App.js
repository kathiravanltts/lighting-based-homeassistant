import { Lightning, Utils } from '@lightningjs/sdk'
import Model from './model.js'
import HomeAssistant from './HomeAssistant.js'
import Home from './Home.js'
import Ms from './Ms.js'

import {
  getAuth,
  getUser,
  callService,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED
} from "./service/index.js";
import { start } from '@lightningjs/sdk/src/Router';


export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Ms:{
        type: Ms,
        x: 0,
        y: 0,
        alpha:1,
        rect: true
      },
        Text: {
        mount: 0.5,
        x: 960,
        y: 720,
        text: {
          text: "Let's start Building!",
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xff000000,
        },
      },
     Home:{
      type: Home,
      x:0,
      y:0,
      alpha: 0,
      signals: { select: true },
      argument: {data:""}
    }
  }
  }

  _construct() {
    this.model = new Model()
    this.connection = ""
    this.lock=false;

  }

  start(ip){
    if(this.lock==false){
      this.lock=true;
      this.model.getAppModel(this,this.viewUpdate,ip);
    }
  }

   viewUpdate(connection,entities,ref){
    ref.connection  = connection;
    ref.patch({
      HomeAssistant: {
          type: HomeAssistant,
          x:510,
          y:500,
          alpha: 1,
          signals: { select: true },
          argument: {data:entities}
        }
    });
    ref._setState('HomeAssistant');
  }

  _init() {
  }

  _setup() {
    getAuth().then((res)=>{
    });
    this._setState('Home')
  }

  static _states() {
    return [
      class HomeAssistant extends this {
        $enter() {

          this.tag('HomeAssistant').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('HomeAssistant').setSmooth('alpha', 0)
        }
        _getFocused() {
           return this.tag("HomeAssistant")
        }
        select({ item }) {
         callService(this.connection, "homeassistant", "toggle", {
          entity_id: item
        });
        }
      },
      class Ms extends this {
        $enter() {
          this.tag('Ms').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Ms').setSmooth('alpha', 0)
        }
        _getFocused() {
           return this.tag("Ms")
        }
      },
      class Home extends this {
        $enter() {
          this.tag('Home').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Home').setSmooth('alpha', 0)
        }
        _getFocused() {
           return this.tag("Home")
        }
        select({ item }) {
         this.tag('Home').setSmooth('alpha', 0)
         this._setState('Ms');//HomeAssistant
         this.start(item);
       
        }
      },
    ]
}
}
