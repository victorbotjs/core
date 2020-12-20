import {  Message } from "discord.js"

export default interface IDiscordMsgHandler{
 handleMessage(message:Message): void;
}