import React from 'react';
import { ArrowRight, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import PressReleaseCard from './PressReleaseCard';

const NewsGrid: React.FC = () => {
  const newsItems = [
    {
      image: 'handshake.png',
      title: 'AmacaThera Collaborates With Leading Global Pharmaceutical Company',
      description: 'VANCOUVER, BC, June 10, 2024—AmacaThera, a clinical-stage biotech critically developing a differentiated, in situ delivery platform to improve post-operative pain management, is pleased to announce a collaboration with a leading global pharmaceutical company.',
      date: 'June 10, 2024',
      category: 'Press Release'
    },
    {
      image: 'presentation.png',
      title: "BDC features AmacaThera's journey",
      description: 'Molly Shoichet and Mike Cooke, AmacaThera\'s co-founders, recently took centre stage at BDC Capital\'s "State of the Small and Medium Business" event at the Board Room of Canada. The annual gathering offers a unique perspective on the business landscape from the nation\'s leading entrepreneurs.',
      date: 'May 8, 2024',
      category: 'Press Release'
    },
    {
      image: 'lab-work.png',
      title: 'AmacaThera Closes Series A Extension to Advance Clinical Development of Long Acting...',
      description: 'TORONTO, May 7, 2024 /CNW/ – AmacaThera, Inc., a clinical-stage biotech focused on the development of novel hydrogels, targeted formulation technologies, and innovative drug delivery systems, announced today the close of its oversubscribed CAD$10.3 million Series A Extension to further the company\'s clinical development and expand the uses of its drug delivery platform.',
      date: 'May 7, 2024',
      category: 'Press Release'
    },
    {
      image: 'surgery.png',
      title: 'AmacaThera announces first-in-human non-opioid analgesic in post-surgical pain management',
      description: 'TORONTO, June 8, 2023—Pharmaceutical company AmacaThera, a clinical-stage biotech pioneering drug delivery systems from the University of Toronto, announced today it\'s commencing a Phase I clinical trial of its leading non-opioid analgesic for post-surgical pain and recovering from surgical care.',
      date: 'June 8, 2023',
      category: 'Press Release'
    },
    {
      image: 'medical-care.png',
      title: 'AmacaThera Presents Promising Data when prescribed episod after undergoing surgical care.',
      description: 'MADRID, June 1-5, 2023—AmacaThera presented exciting new results at the European Society of Cardiology conference. The data demonstrates significant improvement in patient recovery time and pain management following cardiac procedures.',
      date: 'June 5, 2023',
      category: 'Press Release'
    },
    {
      image: 'consultation.png',
      title: 'AmacaThera Successfully Dose 10 Subjects in Phase 1 Clinical Trial of Surgeon™ Therapeutic...',
      description: 'TORONTO, March 8, 2023 /CNW/ – AmacaThera Inc., a clinical-stage biotech company developing therapies for post-surgical pain management, announced the successful enrollment and first-dose study of the 10 subjects and final dose in its Phase 1 clinical trial of Surgeon™.',
      date: 'March 8, 2023',
      category: 'Press Release'
    },
    {
      image: 'cancer-research.png',
      title: "AmacaThera's Lung Cancer Formulations Recognized in Prestigious MIT Award",
      description: 'AmacaThera, a clinical-stage biotech critically developing a differentiated, in situ delivery platform to improve outcomes in targeted therapeutic areas, announced today that its novel lung cancer formulations have received great funding from the Canadian government for the company.',
      date: 'Jan 5, 2023',
      category: 'Press Release'
    },
    {
      image: 'discussion.png',
      title: 'How AMT-143 could reduce the critical unmet need for opioids.',
      description: 'In June 2022, we created and published three Cooke-Shoichet Patent called about AMT-143 could reduce the critical unmet need for opioids focusing on the reduction for drug development.',
      date: 'June 28, 2022',
      category: 'Blog Release'
    },
    {
      image: 'xray-review.png',
      title: "AmacaThera animation showcases company's unique technology",
      description: 'In June 2022, we created and published three Cooke-Shoichet Patent called about AMT-143 could reduce the critical unmet need for opioids focusing on the reduction for drug development.',
      date: 'June 28, 2022',
      category: 'Blog Release'
    },
    {
      image: 'microscope.png',
      title: 'AmacaThera CEO Mike Cooke selected to address prestigious BIO CEO...',
      description: 'VANCOUVER, BC, June 10th—CEO, co-founder by 2023 - Abstract AmacaThera announced today that CEO and co-founder Mike Cooke has been selected to present at the prestigious BIO CEO Conference representing a wide range of life science, biotech, and pharmaceutical industries.',
      date: 'November 18, 2021',
      category: 'Press Release'
    },
    {
      image: 'meeting.png',
      title: "AmacaThera named CIX Top 20 Early Company",
      description: 'TORONTO, June 27, 2021—AmacaThera Inc. has been named a Canadian Innovation Exchange (CIX) Top 20 Early Company for 2021.',
      date: 'September 27, 2021',
      category: 'Press Release'
    },
    {
      image: 'team-discussion.png',
      title: "CBC's Quirks & Quarks features AmacaThera Co-Founder Professor Shoichet",
      description: 'ICYMI: Thanks to CBC\'s Quirks and Quarks for covering the November 2020 announcement of Professor Shoichet\'s...',
      date: 'July 18, 2021',
      category: 'Press Release'
    },
    {
      image: 'lab-scientist.png',
      title: 'Out of the lab, into the marketplace',
      description: 'Cooke and Tran became AmacaThera\'s co-founders, launching AmacaThera with the help of an exclusive worldwide license from the University of Toronto for technology covering hydrogels in both the United States and Europe. (see five-part story in the Toronto Star, published July 20, 2021)',
      date: 'February 23, 2021',
      category: 'Press Release'
    },
    {
      image: 'signing.png',
      title: 'AmacaThera Announces Close of Oversubscribed Series A',
      description: 'TORONTO, February 19, 2021—AmacaThera announced today the close of its oversubscribed CAD$10.3 million Series A financing led by BDC Capital. Lumira Ventures and AMT-143, the company\'s lead clinical asset, and pipeline expansion.',
      date: 'February 19, 2021',
      category: 'Press Release'
    },
    {
      image: 'award.png',
      title: 'Professor Molly Shoichet awarded the Gerhard Herzberg Gold Medal',
      description: 'Professor Molly Shoichet—co-founder of AmacaThera and a University of Toronto Professor of Chemical Engineering and Applied Chemistry—has been awarded the Natural Science and Engineering Research Council of Canada (NSERC) Herzberg Canada Gold Medal for Science...',
      date: 'November 19, 2020',
      category: 'Press Release'
    },
    {
      image: 'lab-equipment.png',
      title: 'AmacaThera Secures Funding to Initiate Phase 1 Trial of Non-Opioid...',
      description: 'AmacaThera, a Toronto-based company commercializing hydrogel-based drug delivery technologies, announced today that it has received $245k in grant financing from leading development, York Region, and City of Toronto.',
      date: 'January 8, 2020',
      category: 'Press Release'
    },
    {
      image: 'scientist-portrait.png',
      title: "Ontario Names Molly Shoichet the Province's First Chief",
      description: 'Shoichet will help Accelerate Scientific Innovation and Advance Ontario as a Global Innovation Leader. Ontario has appointed thirty Shoichet at the University of Toronto as the province\'s first Chief Scientist.',
      date: 'November 12, 2017',
      category: 'Press Release'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow">
              {/* Image */}
              <div className=" bg-gradient-to-br rounded-lg from-slate-300 to-slate-400 overflow-hidden">
                <img src={`/images/news/${item.image}`} className='w-full h-52' alt="" />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-slate-800 font-bold text-lg mb-6 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-4">
                  {item.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-slate-200">
                  <div className="text-xs text-slate-500">
                    <div>{item.date}</div>
                    <div className="font-semibold">{item.category}</div>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded hover:bg-slate-700 transition-colors flex items-center gap-2">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            // <PressReleaseCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;