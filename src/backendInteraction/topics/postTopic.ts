import { IPostTopic } from "../../interface";
import { apiURL } from "../../constant";

/**
 * Function to post a topic
 * @param topic - The topic to be posted as an IPostTopic
 * @returns - A promise that resolves to void
 */
export async function postTopic(topic: IPostTopic) {
    const response = await fetch(apiURL+"topics/", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(topic),
    });
    if (!response.ok) {
        throw new Error('Failed to post topic');
    }
}