import { IMessage } from "./IMessage";

/**
 * Interface for PostMessage
 * @interface IPostMessage
 * @property {IMessage} topic - The mesage to be posted
 * @property {string} ringSignature - The ring signature of the topic
 */
export interface IPostMessage {
    message : IMessage;
    ringSiganture : string;
}