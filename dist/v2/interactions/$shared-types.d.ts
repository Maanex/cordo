/// <reference types="node" />
import { LocalisationContext } from "../..";
import { MessageComponent } from "../components/$component";
import { Const } from "../types/const";
import { MessageEmbed } from "../types/discord";
import { ListOmit } from "../types/helper";
import { GenericInteraction, Interaction } from "./$interaction";
export declare type TextBasedInteractionCallbackData<CustomIds extends string> = {
    tts?: boolean;
    content?: string;
    flags?: Const.InteractionResponseFlags;
    embeds?: Partial<MessageEmbed>[];
    allowedMentions?: any;
    components?: MessageComponent<any, CustomIds>[];
    description?: string;
    title?: string;
    footer?: string;
    image?: string;
    thumbnail?: string;
    color?: number;
    context?: LocalisationContext;
};
export declare type CommandOption = {
    name: string;
    type: Const.ApplicationCommandOptionType;
    value?: string | number;
    options?: CommandOption[];
    focused?: boolean;
};
export declare namespace InteractionReplies {
    type Context = {
        id: string;
        interaction: GenericInteraction;
        timeout: number;
        timeoutRunFunc: (skipJanitor?: boolean) => any;
        timeoutRunner: NodeJS.Timeout;
        onInteraction: TimeoutOptions['onInteraction'];
        handlers: Map<string, Handlers.InteractionHandler<'COMPONENT'>>;
        slottedHandlers: Set<Handlers.SlottedInteractionHandler<'COMPONENT'>>;
    };
    type LevelTwoState<CustomIds extends string> = {
        _context: Context;
        withTimeout(millis: number, janitor?: (edit: InteractionJanitor) => any, options?: TimeoutOptions): LevelThreeState<CustomIds>;
    };
    type LevelThreeState<CustomIds extends string> = {
        _context: Context;
        on<Id extends CustomIds>(customId: Id | `$${string}` | `${string}$${string}`, handler: Handlers.InteractionHandler<'COMPONENT'>): LevelThreeState<ListOmit<CustomIds, Id>>;
        edit(data: TextBasedInteractionCallbackData<string>): void;
        followUp(data: TextBasedInteractionCallbackData<string>): void;
        triggerJanitor(): void;
    };
    type TimeoutOptions = {
        onInteraction?: 'restartTimeout' | 'removeTimeout' | 'triggerTimeout' | 'doNothing';
    };
    type InteractionJanitor = {
        edit(data: TextBasedInteractionCallbackData<string>): void;
        disableComponents(): void;
        removeComponents(): void;
        state(state?: string, ...args: any): void;
    };
}
export declare namespace Handlers {
    type InteractionHandler<Type extends Const.InteractionTypeNames> = (i: Interaction<Type>) => void;
    type SlottedInteractionHandler<Type extends Const.InteractionTypeNames> = {
        regex: RegExp;
        id: string;
        handler: InteractionHandler<Type>;
    };
}
