xports.handler = async (event) => {
  const path = event.queryStringParameters.path || '/domains';
  const url = 'https://api.mail.tm' + path;

  const headers = { 'Content-Type': 'application/json' };
  if (event.headers.authorization) {
    headers['Authorization'] = event.headers.authorization;
  }

  const options = { method: event.httpMethod, headers };
  if (event.body && event.httpMethod !== 'GET' && event.httpMethod !== 'DELETE') {
    options.body = event.body;
  }

  try {
    const res = await fetch(url, options);
    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json' },
      body: text || '{}'
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};e
