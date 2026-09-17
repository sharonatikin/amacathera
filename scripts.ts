// scripts.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { connectDB } from '@/lib/mongodb';
import News from '@/lib/models/News';
import { slugify } from '@/lib/slugify';

export async function backfillSlugs() {
  await connectDB();
  
  // Find items where slug doesn't exist, is null, or is an empty string
  const articles = await News.find({
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }]
  });

  console.log(`Found ${articles.length} articles to update.`);

  for (const article of articles) {
    let base = slugify(article.mainHeading);
    let candidate = base;
    let count = 1;

    while (await News.exists({ slug: candidate, _id: { $ne: article._id } })) {
      candidate = `${base}-${count++}`;
    }

    article.slug = candidate;
    await article.save();
    console.log(`Updated "${article.mainHeading}" -> /${candidate}`);
  }

  console.log('Backfill complete.');
  process.exit(0);
}

backfillSlugs().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

