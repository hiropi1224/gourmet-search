/* eslint-disable */

// Y035: 原宿・青山・表参道, Y030: 渋谷
const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&middle_area=Y035&count=100`;

export default async (req: any, res: any) => {
  let url = defaultEndpoint;

  if (typeof req.query.keyword !== undefined) {
    url = `${url}&keyword=${req.query.keyword}`;
  }

  if (typeof req.query.isLunch !== undefined) {
    url = `${url}&keyword=${req.query.keyword}&lunch=${req.query.lunch}`;
  }

  if (typeof req.query.order !== undefined) {
    url = `${url}&keyword=${req.query.keyword}&lunch=${req.query.lunch}&order=${req.query.order}`;
  }

  url = encodeURI(url);
  console.log(url, 'req url');
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
};
