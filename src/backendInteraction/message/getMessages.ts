import { apiURL } from "../../constant";

export async function get25MessagesByTopicId(topicId: string) {
  const response = await fetch(`${apiURL}messages?topicId=${topicId}`);
  const messages = await response.json();
  return messages;
}

export async function getAllMessagesByTopicId(topicId: string) {
  const response = await fetch(`${apiURL}messages?topicId=${topicId}`);
  const messages = await response.json();
  return messages;
}