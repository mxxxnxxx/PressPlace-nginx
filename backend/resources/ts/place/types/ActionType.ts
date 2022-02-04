import { Inputs } from "./Inputs";

export type ActionType = { type: "name"; } |
{ type: "address"; } |
{ type: "comment"; } |
{ type: "tag"; index: number; } |
{
    type: "set";
    formData: Inputs
}
