import { PointerSensor } from '@dnd-kit/core';

const excludedElements = ['input', 'select'];

export class CustomPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({ nativeEvent: event }) => {
        const tagName = event.target.tagName.toLowerCase();
        if (excludedElements.includes(tagName)) {
          return false;
        }
        return true;
      },
    },
  ];
}
