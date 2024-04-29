import { IPostTopic } from "../../interface";
import { apiURL } from "../../constant";

/**
 * Function to post a topic
 * @param topic - The topic to be posted as an IPostTopic
 * @returns - A promise that resolves to void
 */
export async function getAllTopics() {
    const response = await fetch(apiURL+"topics/", {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to get topic');
    }
}

/**
 * Function to get a topic by id
 * @param id - The id of the topic to be fetched
 */
export async function getTopicById(id: string) {
    const response = await fetch(apiURL+"topics/"+id, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to get topic');
    }
}