/* eslint-disable */

const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&small_area=XA0Z&middle_area=Y035&small_area=X105&party_capacity=25`;

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
