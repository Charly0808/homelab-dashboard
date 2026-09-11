import { getIdracInfo } from '@/lib/idrac';
export const dynamic='force-dynamic';
export const runtime='nodejs';
export async function GET(){const data=await getIdracInfo(); return Response.json(data,{status:data.connected||!data.configured?200:503});}
