import { Config } from "apollo-server-core";

const endpoint = `${
  process.env.OFFLINE ? `http://localhost:1337/` : process.env.URL
}${process.env.NETLIFY ? `.netlify/functions/yotsuba-api/` : `dev`}`;

export const playground: Config["playground"] = {
  settings: {
    // @ts-ignore
    "schema.polling.interval": 10000
  },
  tabs: [
    {
      endpoint,
      name: `getBoards`,
      query: `query getBoards {
        boards {
          id
          title
          description
          pages
          worksafe
          category {
            id
            boards {
              id
            }
          }
        }
      }`
    },
    {
      endpoint,
      name: `getThread`,
      query: `query getThread($board: ID!, $id: ID!, $latest: Boolean!) {
        thread(board: $board, id: $id) {
          id
          topic
          replies
          images
          sticky
          closed
          op {
            ...PostContent
          }
          posts(latest: $latest) {
            ...PostContent
          }
        }
      }

      fragment PostContent on Post {
        id
        isOp
        author
        subject
        content
        timestamp(format: "hh:mm:ssa MMMM Do, YYYY (ddd)")
        board {
          id
        }
        thread {
          id
        }
        attachment {
          url
          thumbnail
          filename
          extension
          filesize
          width
          height
          thumbnailWidth
          thumbnailHeight
        }
      }
      `,
      variables: `{
        "board": "p",
        "id": "1971605",
        "latest": true
      }`
    },
    {
      endpoint,
      name: `getPage`,
      query: `query getPage($board: ID! $number: Int!) {
        page(board: $board number: $number) {
          id
          topic
          op {
            subject
            content
            attachment {
              url
              thumbnail
              filename
              extension
              filesize(convertTo: kB)
              width
              height
              thumbnailWidth
              thumbnailHeight
            }
          }
        }
      }
      `,
      variables: `{
        "board": "a",
        "number": 1
      }`
    },
    {
      endpoint,
      name: `getBanners`,
      query: `query getBanners {
        banners {
          url
          extension
        }
      }
      `
    },
    {
      endpoint,
      name: `getPopular`,
      query: `query getPopular($boards: [ID]!) {
        popular(boards: $boards) {
          id
          images
          replies
          op {
            id
            subject
            teaser
            attachment {
              thumbnail
            }
          }
          board {
            id
            title
          }
        }
      }
      `,
      variables: `{
        "boards": ["3","a","adv","an","asp","biz","c","cgl","ck","cm","co","diy","fa","fit","g","gd","his","int","jp","k","lgbt","lit","m","mlp","mu","n","news","o","out","p","po","qa","qst","sci","sp","tg","toy","trv","tv","v","vg","vip","vp","vr","w","wsg","wsr","x"]
      }`
    },
    {
      endpoint,
      name: `getCatalog`,
      query: `query getCatalog($board: ID! $number: Int!) {
        page(board: $board number: $number) {
          id
          images
          replies
          op {
            id
            subject
            teaser
            attachment {
              thumbnail
            }
          }
        }
      }
      `,
      variables: `{
        "board": "a",
        "number": 1
      }`
    },
    {
      endpoint,
      name: `getQuotes`,
      query: `query getQuotes($board: ID!, $id: ID!) {
        thread(board: $board, id: $id) {
          op {
            id
            quotes {
              id
            }
          }
        }
      }
      `,
      variables: `{
        "board": "3",
        "id": 561987
      }`
    }
  ]
};
