import { IPostTopic } from "../../interface";
import { apiURL } from "../../constant";

/**
 * Function to post a topic
 * @param topic - The topic to be posted as an IPostTopic
 * @returns - A promise that resolves to void
 */
export async function patchTopic(topic: IPostTopic, id: string) {
    const response = await fetch(apiURL+"topics/"+id, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(topic),
    });
    if (!response.ok) {
        throw new Error('Failed to post topic');
    }
}