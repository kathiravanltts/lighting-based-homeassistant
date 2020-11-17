import {
  getAuth,
  getUser,
  callService,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED
} from "./service/index.js";

export default class model {
  async getAppModel(ref, callback, ip) {
    (async () => {
      let auth;
      try {
        let hassUrl = ip;
        auth = await getAuth({ hassUrl });
        const connection = await createConnection({ auth });
        subscribeEntities(connection, entities => {
          callback(connection, entities, ref);
        }
        );

      } catch (err) {
        console.log("error:...");
        console.log(err);
      }
    })();
  }
}
