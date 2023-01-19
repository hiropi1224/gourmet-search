/* eslint-disable */

// Y035: 原宿・青山・表参道, Y030: 渋谷
const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&middle_area=Y035&middle_area=Y030`;

export default async (req: any, res: any) => {
  let url = defaultEndpoint;

  if (typeof req.query.keyword !== undefined) {
    url = `${url}&keyword=${req.query.keyword}`;
  }

  url = encodeURI(url);
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
};
