import { IPostTopic } from "../../interface";
import { apiURL } from "../../constant";
import { ITopic } from "../../interface";

/**
 * Function to post a topic
 * @param topic - The topic to be posted as an IPostTopic
 * @returns - A promise that resolves to void
 */
export async function getAllTopics() {
    const response = await fetch(apiURL + "topics/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to get topics');
    }
    return response.json(); // Convert the response body to JSON and return it
}

export async function getTopicById(id: string): Promise<ITopic> {
    const response = await fetch(`${apiURL}topics/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get topic');
    }

    const topic: ITopic = await response.json(); // Parse the JSON response into an object
    return topic;
}