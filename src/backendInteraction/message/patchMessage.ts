import { apiURL } from "../../constant";
import { IPostMessage } from "../../interface";

export async function patchMessage(messageId: string, newMessage: IPostMessage) {
  const response = await fetch(`${apiURL}messages/${messageId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  });
}
