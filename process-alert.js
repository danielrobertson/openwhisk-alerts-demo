/**
 *
 * @param   params.USER_ALERTS_DB Url for user alerts Cloudant database
 * @return The output of this action, which must be a JSON object.
 *
 */

const nano = require("nano");
function main(params) {
  console.log("Processing new alert...");
  const userAlertsDb = nano(params.USER_ALERTS_DB);
  userAlertsDb.get("heisenberg", (err, data) => {
    if (!err) {
      console.log(data);
    } else {
      console.log(err);
    }
  });
}
