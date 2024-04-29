import { ITopic } from "./ITopic";

/**
 * Interface for PostTopic
 * @interface IPostTopic
 * @property {ITopic} topic - The topic to be posted
 * @property {string} ringSignature - The ring signature of the topic
 */
export interface IPostTopic {
    topic : ITopic;
    ringSiganture : string;
}