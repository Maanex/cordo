import { InteractionCommandHandler, InteractionComponentHandler, InteractionUIState } from './types/custom';
import { CordoConfig, CustomLogger, GuildDataMiddleware, InteractionCallbackMiddleware, UserDataMiddleware } from './types/middleware';
import { GenericInteraction } from './types/base';
export default class Cordo {
    private static commandHandlers;
    private static componentHandlers;
    private static uiStates;
    private static config;
    private static logger;
    private static middlewares;
    static get _data(): {
        config: CordoConfig;
        commandHandlers: {
            [command: string]: InteractionCommandHandler;
        };
        componentHandlers: {
            [command: string]: InteractionComponentHandler;
        };
        uiStates: {
            [name: string]: InteractionUIState;
        };
        middlewares: {
            interactionCallback: InteractionCallbackMiddleware[];
            fetchGuildData: GuildDataMiddleware;
            fetchUserData: UserDataMiddleware;
        };
        logger: CustomLogger;
        isBotOwner: typeof Cordo.isBotOwner;
    };
    static init(config: CordoConfig): void;
    static registerCommandHandler(command: string, handler: InteractionCommandHandler): void;
    static registerComponentHandler(id: string, handler: InteractionComponentHandler): void;
    static registerUiState(id: string, state: InteractionUIState): void;
    static findCommandHandlers(dir: string | string[], prefix?: string): void;
    static findComponentHandlers(dir: string | string[], prefix?: string): void;
    static findUiStates(dir: string | string[], prefix?: string): void;
    static findContext(dir: string | string[]): void;
    static addMiddlewareInteractionCallback(fun: InteractionCallbackMiddleware): void;
    static setMiddlewareGuildData(fun: GuildDataMiddleware): void;
    static setMiddlewareUserData(fun: UserDataMiddleware): void;
    static emitInteraction(i: GenericInteraction): Promise<void>;
    private static onCommand;
    private static componentPermissionCheck;
    private static onComponent;
    private static interactionNotPermitted;
    private static interactionNotOwned;
    private static isBotOwner;
}