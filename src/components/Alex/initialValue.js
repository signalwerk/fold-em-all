import { Value } from 'slate'

export default Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'heading',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '1. Random title',
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'text',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'some more text',
              }
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'text',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta http-equiv="X-UA-Compatible" content="ie=edge">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
              }
            ],
          },
        ],
      },
    ],
  },
})
