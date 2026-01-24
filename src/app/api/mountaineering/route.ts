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
      
      let formattedDate = data.date;
      if (data.date) {
		const date = new Date(data.date);
		formattedDate = date.toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric'
		});
	  }
      
      return {
        id: filename.replace('.md', ''),
        peak: data.peak,
        elevation: data.elevation,
        route: data.route,
        date: formattedDate,
        rawDate: data.date,
      };
    });
    
    // Sort by date, newest first, return top 3
    const recentTrips = trips
      .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime())
      .slice(0, 3)
      .map(({ rawDate, ...rest }) => rest);
    
    return NextResponse.json(recentTrips);
  } catch (error) {
    console.error('Error reading mountaineering files:', error);
    return NextResponse.json([], { status: 200 });
  }
}
