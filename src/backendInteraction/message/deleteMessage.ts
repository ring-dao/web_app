import { apiURL } from "../../constant";
import { IPostMessage } from "../../interface";


export async function deleteMessage(messageId: string, newMessage: IPostMessage) {
  const response = await fetch(`${apiURL}messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  });
}
