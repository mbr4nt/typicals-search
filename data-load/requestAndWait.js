import { makeRequest } from "./makeRequest.js";

/**
 * Calls an API asynchronously, waits for the task to complete, and returns the task's result.
 *
 * @param {string} url - The API URL for initiating the task.
 * @param {string} verb - The HTTP method for initiating the task.
 * @param {Object} [body] - The optional body object to send when initiating the task.
 * @param {string} bearerToken - The Bearer token for authorization.
 * @param {number} pollInterval - The interval (in milliseconds) to wait between status checks.
 * @returns {Promise<Object>} - The final response of the completed task.
 */
export async function requestAndWait(url, verb, body = null, bearerToken, pollInterval = 2000) {
  try {
    // Step 1: Make the initial API call
    const initialResponse = await makeRequest("http://cdksta-gcsen-keqyaikrwmal-2124946720.ca-central-1.elb.amazonaws.com" + url, verb, body, bearerToken);

    // Step 2: Check the task status
    if (!initialResponse.taskUid || !initialResponse.status) {
      throw new Error("Invalid response: Missing 'uid' or 'status' field");
    }

    const taskUid = initialResponse.taskUid;

    // Define a helper function to poll the task's status
    async function pollTaskStatus() {
      // Step 3: Make a status check call
      const statusUrl = `http://cdksta-gcsen-keqyaikrwmal-2124946720.ca-central-1.elb.amazonaws.com/tasks/${taskUid}`;
      const statusResponse = await makeRequest(statusUrl, "GET", null, bearerToken);

      if (!statusResponse.status) {
        throw new Error("Invalid response: Missing 'status' field during polling");
      }

      // Step 4: Check if the task is finished
      if (["succeeded", "failed", "canceled"].includes(statusResponse.status)) {
        return statusResponse; // Task is finished, return the response
      }

      // Step 5: Wait and retry if the task is not finished
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      return pollTaskStatus(); // Recursive call to check the status again
    }

    // Start polling the task's status
    if (["enqueued", "processing"].includes(initialResponse.status)) {
      return await pollTaskStatus();
    }

    // Return the initial response if it is already in a finished state
    return initialResponse;
  } catch (error) {
    console.error("Error handling the asynchronous task:", error.message);
    throw error;
  }
}
