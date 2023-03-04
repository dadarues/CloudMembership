const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const write = async (item, table) => {
  const params = {
    Item: item,
    TableName: table,
  };
  console.log({ params });
  return documentClient.put(params).promise();
};

const scan = async (data) => {
  const params = {
    ...data,
    ExpressionAttributeValues: data.ExpressionAttributeValues || undefined,
  };
  const { Items } = await documentClient.scan(params).promise();
  return Items;
};

const get = async (data) => {
  const { Item } = await documentClient.get(data).promise();
  return Item || {};
};

const query = async (data) => {
  const params = {
    ...data,
    ExpressionAttributeValues: data.ExpressionAttributeValues || {},
  };
  const { Items } = await documentClient.query(params).promise();
  return Items;
};

module.exports = {
  write,
  scan,
  get,
  query
};