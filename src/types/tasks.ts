/**
 * Represents a single suggestion chip that the user can click.
 * Styled by .opa-preview-suggestion in previewer.css.
 */
export interface SuggestionChip {
  label: string;
}

/**
 * Represents a single chat bubble in the conversation.
 * Styled by .chat-bubble in previewer.css.
 */
export interface ChatContent {
  author: 'user' | 'assistant';
  text: string;
}

/**
 * Represents a rich content card, typically containing an image.
 * Styled by .opa-preview-card in previewer.css.
 */
export interface CardContent {
  imageUrl: string;
}

/**
 * A discriminated union for different types of content within a task.
 * This allows for a flexible and type-safe way to render various UI elements.
 */
export type TaskContentItem =
  | {
      type: 'chat';
      content: ChatContent;
    }
  | {
      type: 'suggestions';
      suggestions: SuggestionChip[];
    }
  | {
      type: 'card';
      content: CardContent;
    };

/**
 * The main interface for a task presented to the user.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  content: TaskContentItem[];
}
