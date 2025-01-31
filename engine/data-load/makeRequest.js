import https from "https";
import http from "http";
import { URL } from "url";


/**
 * Makes an HTTP or HTTPS request with the specified parameters and returns the parsed JSON response.
 *
 * @param {string} url - The URL to send the request to.
 * @param {string} verb - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [body] - The optional body object to be sent with the request.
 * @param {string} bearerToken - The Bearer token for authorization.
 * @returns {Promise<Object>} - The parsed JSON response.
 */
export async function makeRequest(url, verb, body = null, bearerToken) {
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const isHttps = parsedUrl.protocol === "https:";
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (isHttps ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: verb,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`
        }
      };

      // If there is a body, add the Content-Length header
      let requestBody = null;
      if (body) {
        requestBody = JSON.stringify(body);
        options.headers["Content-Length"] = Buffer.byteLength(requestBody);
      }

      // Choose the correct protocol (http or https)
      const requestFn = isHttps ? https.request : http.request;

      const req = requestFn(options, (res) => {
        let responseData = "";

        // Collect the response data
        res.on("data", (chunk) => {
          responseData += chunk;
        });

        // Resolve the promise once the response is complete
        res.on("end", () => {
          try {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(JSON.parse(responseData));
            } else {
              reject(
                new Error(
                  `HTTP error! Status: ${res.statusCode}, Body: ${responseData}`
                )
              );
            }
          } catch (err) {
            reject(new Error(`Failed to parse JSON response: ${err.message}`));
          }
        });
      });

      // Handle request errors
      req.on("error", (err) => {
        reject(new Error(`Request error: ${err.message}`));
      });

      // Write the request body if present
      if (requestBody) {
        req.write(requestBody);
      }

      // End the request
      req.end();
    } catch (err) {
      reject(new Error(`Unexpected error: ${err.message}`));
    }
  });
}

