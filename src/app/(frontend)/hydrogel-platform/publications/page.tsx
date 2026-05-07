import BioEngineeringFounder from '@/components/publication/Hero'
import Publication from '@/components/publication/Publication'
import PublicationHero from '@/components/publication/PublicationHero'
import { PublicationType } from '@/types/publications'



async function getPublications(): Promise<PublicationType[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/publications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // Optional: to prevent caching
  });

  if (!res.ok) {
    throw new Error('Failed to fetch publications');
  }

  const data = await res.json();
  return data.data; // Note: Your API returns {success, data, total}
}

const page = async () => {
  const publications = await getPublications()

  // ✅ Group by category
  const groupedPublications = publications.reduce<Record<string, PublicationType[]>>(
    (acc, pub) => {
      if (!acc[pub.category]) {
        acc[pub.category] = []
      }
      acc[pub.category].push(pub)
      return acc
    },
    {}
  )

  return (
    <div>
      <BioEngineeringFounder />

      {/* AmacaGel Platform */}
      {groupedPublications['AmacaGel Platform'] && (
        <>
          <PublicationHero
            image="/images/amacagel-bg.png"
            title="AmacaGel Platform"
          />
          {groupedPublications['AmacaGel Platform'].map((pub, index) => (
            <Publication key={pub._id} pub={pub} index={index} />
          ))}
        </>
      )}

      {/* Biologics Cell */}
      {groupedPublications['Biologics and Cell'] && (
        <>
          <PublicationHero
            image="/images/biologics-bg.png"
            title="Biologics and Cell"
          />
          {groupedPublications['Biologics and Cell'].map((pub, index) => (
            <Publication key={pub._id} pub={pub} index={index} />
          ))}
        </>
      )}

      {/* Small Molecules */}
      {groupedPublications['Small Molecules'] && (
        <>
          <PublicationHero
            image="/images/smallmolecules-bg.png"
            title="Small Molecules"
          />
          {groupedPublications['Small Molecules'].map((pub, index) => (
            <Publication key={pub._id} pub={pub} index={index} />
          ))}
        </>
      )}
    </div>
  )
}

export default page
