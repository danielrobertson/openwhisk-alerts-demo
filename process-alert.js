/**
 *
 * @param   params.USER_ALERTS_DB Url for user alerts Cloudant database
 * @return The output of this action, which must be a JSON object.
 *
 */

const nano = require("nano");

function main(params) {
  return new Promise((resolve, reject) => {
    console.log(
      "Processing new alert with params - " + JSON.stringify(params, null, 2)
    );
    const userAlertsDb = nano(params.USER_ALERTS_DB);
    const usersDb = nano(params.USERS_DB);

    usersDb.view(
      "views",
      "byProductId",
      {
        key: params.product_id,
        include_docs: "true"
      },
      (err, response) => {
        if (!err) {
          const productUsers = (response.rows || []).map(p => p.doc);
          productUsers.forEach(user => {
            const userAlert = {
              _id: user._id + "-" + params.product_id + "-" + new Date(),
              user: user._id,
              product: params.product_id,
              alert: params.message,
              is_archived: false
            };

            userAlertsDb.insert(userAlert, body => {
              console.log(body);
            });

            resolve({ done: true });
          });
        } else {
          reject(err);
        }
      }
    );
  });
}
