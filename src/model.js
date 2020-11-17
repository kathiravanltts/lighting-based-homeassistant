import {
  getAuth,
  getUser,
  callService,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED
} from "./service/index.js";



export default class model {
  async getAppModel(ref,callback,ip) {
    console.log("getAppModel...");
  
     (async () => {
       let auth;
      try {
        console.log("async:...");
        // let hassUrl="http://192.168.0.115:8123"
        let hassUrl=ip;
        auth = await getAuth({ hassUrl });
        const connection = await createConnection({ auth });
        subscribeEntities(connection, entities => {
          // renderEntities(connection, entities)
          callback(connection, entities,ref);
          console.log("entities:");
          console.log(entities);
        console.log("____________________________________________");
          // Object.keys(entities)
          // .sort()
          // .forEach(entId => {
          //   console.log("entId:"+entId);
          //   console.log("entities[entId].state:"+entities[entId].state);
          // });
          console.log("*************************************************")
         }
        );

      } catch (err) {
        console.log("error:...");
        // if (err === ERR_HASS_HOST_REQUIRED) {
        //   // const hassUrl = prompt(
        //   //   "What host to connect to?",
        //   //   "http://localhost:8123"
        //   // );
        //   //if (!hassUrl) return;
        //   let hassUrl="192.168.0.102:8123"
        //   console.log("ip:"+hassUrl);
        //   auth = await getAuth({ hassUrl });
        // } else {
        //   console.log(`Unknown error: ${err}`);
        //   // alert(`Unknown error: ${err}`);
        //   return;
        // }
      }
      // const connection = await createConnection({ auth });
      // subscribeEntities(connection, entities => {
      //   // renderEntities(connection, entities)
      //   console.log("entities:");
      //   console.log(entities);
      //  }
      // );
      // Clear url if we have been able to establish a connection
      // if (location.search.includes("auth_callback=1")) {
      //   history.replaceState(null, "", location.pathname);
      // }

      // To play from the console
      // window.auth = auth;
      // window.connection = connection;
      // getUser(connection).then(user => {
      //   console.log("Logged in as", user);
      //   // window.user = user;
      // });
    })();

  }
}
