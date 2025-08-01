import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // In a real application, you would verify the webhook signature.
    console.log('Received webhook:', req.body);
    // You would then trigger a re-fetch of the tasks.
    res.status(200).send('OK');
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}