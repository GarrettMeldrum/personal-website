import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const mountaineeringDir = path.join(process.cwd(), 'src/content/mountaineering');
    const files = fs.readdirSync(mountaineeringDir).filter(file => file.endsWith('.md'));
    
    const trips = files.map((filename) => {
      const filePath = path.join(mountaineeringDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        id: filename.replace('.md', ''),
        peak: data.peak,
        elevation: data.elevation,
        route: data.route,
        date: data.date,
      };
    });
    
    // Sort by date, newest first, return top 3
    const recentTrips = trips
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
    
    return NextResponse.json(recentTrips);
  } catch (error) {
    console.error('Error reading mountaineering files:', error);
    return NextResponse.json([], { status: 200 });
  }
}
