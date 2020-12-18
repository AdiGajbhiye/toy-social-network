const checkAddress = async (contract) => {
  const address = await contract.address;
  assert.notEqual(address, 0x0);
  assert.notEqual(address, "");
  assert.notEqual(address, null);
  assert.notEqual(address, undefined);
};

const getEvent = async (resultPromise) => {
  const result = await resultPromise;
  return result.logs[0].args;
};

module.exports = { checkAddress, getEvent };
