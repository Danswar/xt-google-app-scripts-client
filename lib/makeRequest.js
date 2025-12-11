const CryptoJS = require('./crypto');

function makeRequest(accessKey, secretKey) {

  const localAccessKey = accessKey;
  const localSecretKey = secretKey;

  const baseUrl = "https://sapi.xt.com";
  return (method, path, query, body) => {
    if (!localAccessKey || !localSecretKey) {
      return;
    }

    const headerPairs = [
      ["validate-algorithms", "HmacSHA256"],
      ["validate-appkey", localAccessKey],
      ["validate-recvwindow", "60000"],
      ["validate-timestamp", Date.now().toString()],
    ];

    const X = headerPairs
      .map((t) => t.join("="))
      .join("&");
    const queryStr =
      query && Object.keys(trimObject(query)).length ? `#${sortQueryParams(query)}` : "";
    const stringifiedBody = body && Object.keys(trimObject(body)).length ? JSON.stringify(body) : "";
    const bodyStr =
      body && Object.keys(trimObject(body)).length ? `#${stringifiedBody}` : "";
    const Y = `#${method}#${path}${queryStr}${bodyStr}`;
    const signature = CryptoJS.HmacSHA256(`${X}${Y}`, localSecretKey).toString(CryptoJS.enc.Hex);

    headerPairs.push(["validate-signature", signature]);
    const headers = headerPairs.reduce((r, t) => ((r[t[0]] = t[1]), r), {});
    const url = `${baseUrl}${path}${queryStr && encodeURI(queryStr.replace("#", "?"))}`;
    const options = {
      method: method,
      headers: headers,
      body: stringifiedBody,
    };

    try {
      const response = UrlFetchApp.fetch(url, options).getContentText("UTF-8");
      return response;
    } catch (error) {
      throw error;
    }
  };
}

function sortQueryParams(queryObject) {
  let sortResult = "";
  Object.keys(queryObject)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
      if (typeof queryObject[key] === "undefined") return;
      sortResult += `${(sortResult && "&") || ""}${key}=${queryObject[key]}`;
    });
  return sortResult;
}

function trimObject(obj) {
  const und = void 0;
  for (let key in obj) {
    obj[key] === und && delete obj[key];
  }
  return obj;
}

module.exports = makeRequest;