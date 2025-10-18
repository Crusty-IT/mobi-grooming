import fs from 'fs';
import path from 'path';
import Dashboard from '../components/dashboard/Dashboard';

export interface AnnouncementEntry {
  slug: string;
  title: string;
  date?: string;
  body: string;
}

async function getAnnouncements(): Promise<AnnouncementEntry[]> {
  // Build absolute path to the announcements content directory
  const dir = path.join(process.cwd(), 'src', 'content', 'announcements');

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.md'));

  const entries: AnnouncementEntry[] = files.map((file) => {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');

    let title = '';
    let date: string | undefined = undefined;
    let body = raw;

    // Very lightweight frontmatter extractor to avoid extra deps
    if (raw.startsWith('---')) {
      const endIdx = raw.indexOf('\n---', 3);
      if (endIdx !== -1) {
        const fm = raw.substring(3, endIdx).trim();
        body = raw.substring(endIdx + 4).trim();
        for (const line of fm.split('\n')) {
          const idx = line.indexOf(':');
          if (idx === -1) continue;
          const key = line.substring(0, idx).trim();
          const value = line.substring(idx + 1).trim().replace(/^[\'\"]|[\'\"]$/g, '');
          if (key === 'title') title = value;
          if (key === 'date') date = value;
        }
      }
    }

    return {
      slug: file.replace(/\.(md|markdown)$/i, ''),
      title: title || file,
      date,
      body,
    } as AnnouncementEntry;
  });

  entries.sort((a, b) => {
    if (a.date && b.date) return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    if (a.date) return -1;
    if (b.date) return 1;
    return a.slug > b.slug ? -1 : a.slug < b.slug ? 1 : 0;
  });

  return entries;
}

export default async function Home() {
  const announcements = await getAnnouncements();
  return <Dashboard announcements={announcements} />;
}
