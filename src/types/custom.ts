/* eslint-disable camelcase */

import { MessageEmbed } from 'discord.js'
import { GenericInteraction, InteractionJanitor, ReplyableCommandInteraction, ReplyableComponentInteraction } from './base'
import { MessageComponent } from './component'
import { InteractionResponseFlags } from './const'


// Other

export type LocalisationContext = {
  [key: string]: string
}

export type HandlerSuccess = boolean | Promise<boolean> | any

// Interesting

export type InteractionApplicationCommandCallbackData = {
  tts?: boolean
  content?: string
  flags?: InteractionResponseFlags
  embeds?: Partial<MessageEmbed>[]
  allowed_mentions?: any
  components?: MessageComponent[]

  description?: string
  title?: string
  footer?: string
  image?: string
  color?: number
  _context?: LocalisationContext
}

// Handler

export type InteractionCommandHandler
  = ((i: ReplyableCommandInteraction) => HandlerSuccess)

export type InteractionComponentHandler
  = ((i: ReplyableComponentInteraction) => HandlerSuccess)

// Reply flow

export type InteractionReplyContext = {
  id: string
  interaction: GenericInteraction
  timeout: number
  timeoutRunFunc: (...any: any) => any
  timeoutRunner: NodeJS.Timeout
  onInteraction: InteractionReplyTimeoutOptions['onInteraction']
  handlers: { [customId: string]: InteractionComponentHandler }
}

export type InteractionReplyStateLevelThree = {
  _context: InteractionReplyContext,
  on(customId: string, handler: InteractionComponentHandler): InteractionReplyStateLevelThree
}

export type InteractionReplyTimeoutOptions = {
  onInteraction?: 'restartTimeout' | 'removeTimeout' | 'triggerTimeout' | 'doNothing'
}

export type InteractionReplyStateLevelTwo = {
  _context: InteractionReplyContext,
  withTimeout(millis: number, janitor: (edit: InteractionJanitor) => any, options?: InteractionReplyTimeoutOptions): InteractionReplyStateLevelThree
}

// States

export type InteractionUIState = (i: GenericInteraction, ...args: any) => InteractionApplicationCommandCallbackData | Promise<InteractionApplicationCommandCallbackData>
