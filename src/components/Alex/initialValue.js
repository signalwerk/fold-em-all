import { Value } from 'slate'

export default Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '1. Random title\nsome more text',
              },
            ],
          },
        ],
      },
    ],
  },
})
