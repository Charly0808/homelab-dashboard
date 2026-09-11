import { getServicesStatus } from '@/lib/services';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({services:await getServicesStatus(),checkedAt:new Date().toISOString()});}catch(e){return Response.json({services:[],error:e instanceof Error?e.message:'Unable to load services'}, {status:500});}}
