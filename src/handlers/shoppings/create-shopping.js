const { createShopping } = require('../../controllers/shoppingsController');
const { headers } = require("../../utils/http-utils");

module.exports.handler = async (event, _context, _callback) => {
  try {
    if (!event.body) {
      throw new Error("No body was sent");
    }
    let { body } = event;
    body = typeof body === 'string' ? JSON.parse(body) : body;
    
    const response = await createShopping(body);
    console.log({response});

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        error: false,
        msg: "Hola Lambda!",
        body: response
      }),
    };
  } catch (error) {
    return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: true,
          msg: error.message,
        }),
      };
  }
};