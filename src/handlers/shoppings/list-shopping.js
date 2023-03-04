const { getShopping } = require('../../controllers/shoppingsController');
const { getShoppings } = require('../../controllers/shoppingsController');
const { scan } = require('../../utils/dynamoDB');
const { headers } = require('../../utils/http-utils');

module.exports.handler = async (event, _context, _callback) => {
    console.log("[DEBUG - List Shippings]", event);

    console.log(event.pathParameters);
    var response;
    if(!event.pathParameters){
        response = await getShoppings();
    } else {
        const { shoppingId } = event.pathParameters;

        response = await getShopping(shoppingId);
    }

    console.log({response});

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            error: false,
            body: JSON.stringify(response)
        })
    }
}