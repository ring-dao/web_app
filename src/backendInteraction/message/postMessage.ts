import { apiURL } from "../../constant";
import { IPostMessage } from "../../interface";

export async function postMessage(message: IPostMessage) {
  const response = await fetch(`${apiURL}messages/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    throw new Error('Failed to delete message');
  }
}
