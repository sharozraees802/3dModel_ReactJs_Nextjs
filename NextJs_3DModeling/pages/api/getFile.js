// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import url from 'url';


export default async (req, res) => {
    res.statusCode = 200
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    const fetchQuery = await (await fetch(query.url)).blob();
    res.send(fetchQuery.stream().read())
}
