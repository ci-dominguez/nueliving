const handler = async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};
export default handler;
