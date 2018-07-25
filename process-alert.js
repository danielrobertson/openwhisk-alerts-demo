/**
 * @param   params.USER_ALERTS_DB Url for user alerts Cloudant database
 * @return status message: done or an error object
 */

const nano = require("nano");

function main(params) {
  return new Promise((resolve, reject) => {
    console.log("params - " + JSON.stringify(params, null, 2));
    const userAlertsDb = nano(params.USER_ALERTS_DB);
    const usersDb = nano(params.USERS_DB);

    // find the user's who own the product
    usersDb.view(
      "views",
      "byProductId",
      {
        key: params.product_id,
        include_docs: "true"
      },
      (err, response) => {
        if (!err) {
          // for each user on a product, create a copy of the alert
          (response.rows || []).map(data => {
            const user = data.doc;
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
