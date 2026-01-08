interface Publication {
  date: string;
  title: string;
  authors: string;
  publishedInfo: string;
}

export const publications: Publication[][] = [
  [
    {
      date: "2019-03-01",
      title: "A hyaluronan/methylcellulose-based hydrogel for local cell and biomolecule delivery to the central nervous system",
      authors: "M. T. Ho, C. J. Teal, and Molly S. Shoichet.",
      publishedInfo: "Published in Brain Research Bulletin, Mar. 2019",
    },
    {
      date: "2010-10-02",
      title: "Intrathecal delivery of a polymeric nanocomposite hydrogel after spinal cord injury",
      authors: "M. Douglas Baumann, Catherine E. Kang, Charles H. Tator, and Molly S. Shoichet.",
      publishedInfo: "Published in Biomaterials, Oct. 2010",
    },
    {
      date: "2006-01-03",
      title: "Fast-gelling injectable blend of hyaluronan and methylcellulose for intrathecal, localized delivery to the injured spinal cord.",
      authors: "Dimpy Gupta, Charles H. Tator and Molly S Shoichet",
      publishedInfo: "Published in Biomaterials, Jan. 2006",
    },
    {
      date: "2010-10-02",
      title: "Intrathecal delivery of a polymeric nanocomposite hydrogel after spinal cord injury",
      authors: "M. Douglas Baumann, Catherine E. Kang, Charles H. Tator, and Molly S. Shoichet.",
      publishedInfo: "Published in Biomaterials, Oct. 2010",
    }
  ],
  [
    {
      date: "2020-10-14",
      title: "Biodegradable transplantation of retinal pigmented epithelium and photoreceptors restores vision in an animal model of advanced retinal degeneration",
      authors: "Nikolaos Mitrousis, Sadhvi Haschkowitz, Margaret T. Ho, Yves Saüed, Amihas Nagy, Derek van der Kooy and Molly S. Shoichet",
      publishedInfo: "Published in Published in Nature Communications",
    },
    {
      date: "2019-02-02",
      title: "Initial cell maturity changes following transplantation in a hyaluronate-based hydrogel and injected therapeutically in an animal model of stroke",
      authors: "Samantha L. Payne, Arup Tuladhar, Jaclyn M. Obermeyer, Balata V. Vargas, Carter J. Teal, Chiara M. Morehead, Andrea Nogo and Molly S. Shoichet",
      publishedInfo: "Published in Published in Biomaterials, Feb. 2019, 2019-02-02",
    },
    {
      date: "2019-03-01",
      title: "Controlled release strategy designed for intravitreal protein delivery to the retina",
      authors: "Justin Lewin, Gregory J. Rish, Matthew Martinez, Eli Leh S. Tao, Arun N. Arora, Valerie Wallack, and Molly S. Shoichet",
      publishedInfo: "Published in Published in Journal of Controlled Release, Jun. 2019, 2019-03-01",
    },
    {
      date: "2016-05-13",
      title: "Encapsulation-free controlled release: Electrostatic adsorption eliminates the need for protein encapsulation in PLGA nanoparticles",
      authors: "Magdala M. Datollas, Sisi Ellent Ouanoghue, Jaclyn M. Obermeyer, Arup Tuladhar, Tyler S. Shengluk and Molly S. Shoichet",
      publishedInfo: "Published in Published in Science Advances, May 2016, 2016-05-13",
    },
    {
      date: "2015-06-10",
      title: "A Hyaluronan-Based Injectable Hydrogel Improves the Survival and Integration of Stem Cell Progeny following Transplantation",
      authors: "Brian C. Ballios, Michael J. Cooke, Laura Donaldson, Brenda L. K. Coles, Chioli M. Morshead",
      publishedInfo: "Published in Published in Stem Cell Reports, Jun. 2015, 2015-06-10",
    },
    {
      date: "2013-11-14",
      title: "Bioengineered sequential growth factor delivery stimulates brain tissue regeneration after stroke",
      authors: "Yuanmei Wang, Michael J. Cooke, Neela Sachewsky, Chioli M. Morshead, and Molly S. Shoichet",
      publishedInfo: "Published in Published in Journal of Controlled Release, Nov. 2013, 2013-11-14",
    },
    {
      date: "2012-01-01",
      title: "Tunable growth factor delivery from injectable hydrogels for tissue engineering",
      authors: "Katarina Vulic and Molly S. Shoichet",
      publishedInfo: "Published in Published in Journal of the American Chemical Society, Jan. 2012, 2012-01-01",
    },
    {
      date: "2011-12-16",
      title: "Hydrogel delivery of erythropoietin to the brain for endogenous stem cell stimulation after stroke injury",
      authors: "Yuanmei Wang, Michael J. Cooke, Chioli M. Morshead, Molly S. Shoichet",
      publishedInfo: "Published in Published in Biomaterials, Dec. 2011, 2011-12-16",
    }
  ],
  [
    {
      date: '2015-10-14',
      title: 'Circumventing the blood-brain barrier: Local delivery of cyclosporin A stimulates stem cells in stroke-injured rat brain.',
      authors: 'Anup Tuladhar, Cindi M. Morshead, and Molly S. Shoichet.',
      publishedInfo: 'Published in Published in Journal of Controlled Release, Oct. 2015, 2015-10-14',
    },
    {
      date: '2013-03-23',
      title: 'A hydrogel composite system for sustained epi-cortical delivery of Cyclosporin A to the brain for treatment of stroke.',
      authors: 'Matthew J. Caicco, Michael J. Cooke, Yuanfei Wang, Anup Tuladhar, Cindi M. Morshead, and Molly S. Shoichet.',
      publishedInfo: 'Published in Published in Journal of Controlled Release, Mar. 2013, 2013-03-23',
    },
    {
      date: '2009-12-17',
      title: 'Accelerated release of a sparingly soluble drug from an injectable hyaluronan-methylcellulose hydrogel.',
      authors: 'Yuanfei Wang, Yakov Lapitsky, Catherine E. Kang, and Molly S. Shoichet.',
      publishedInfo: 'Published in Published in Journal of Controlled Release, Dec. 2009, 2009-12-17',
    }
  ],
]

// [
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000001"
//     },
//     "mainHeading": "AmacaThera Signs Exclusive Global Licensing Agreement with Pacira BioSciences for Up To US$230 Million, Validating Its Tunable Drug Delivery Platform",
//     "subHeading": "AmacaThera receives US$5 million upfront and up to US$225 million in potential future milestone payments with Pacira BioSciences for AMT-143, AmacaThera's long-acting non-opioid anesthetic for post-operative pain.",
//     "date": {
//       "$date": "2025-11-04T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "award.png",
//     "content": "• AmacaThera receives US$5 million upfront and up to US$225 million in potential future milestone payments with Pacira BioSciences for AMT-143, AmacaThera's long-acting non-opioid anesthetic for post-operative pain.\n• AMT-143 leverages AmacaThera's breakthrough tunable hydrogel platform, delivering sustained local release of ropivacaine.\n• AmacaThera and Pacira will collaborate on the Phase 2 clinical program, and Pacira will fund clinical development, manufacturing, and commercialization, with the program projected to commence in 2026.\n• Partnership marks a major validation of AmacaThera's scalable hydrogel delivery technology and its transformative potential across multiple therapeutic areas.\nToronto, Ontario – November 4, 2025 — AmacaThera, a leading developer of next generation hydrogel-based drug delivery solutions that enable precise, tunable, and sustained release to improve a wide range of active therapeutics, today announced an exclusive worldwide licensing agreement with Pacira BioSciences, Inc., a leader in non-opioid pain management, for the development and commercialization of AMT-143, an investigational long-acting non-opioid anesthetic for post-operative pain.\nAmacaThera's innovative hydrogel-based drug delivery platform provides precise, localized, and extended-release capabilities in an easy-to-administer format. AMT-143 has been clinically tested in a Phase 1 trial and delivered sustained release of ropivacaine for up to 14 days. The platform's adaptability supports a wide spectrum of therapeutics, from small molecules to biologics, making it a scalable and customizable solution for today's complex drug delivery needs.\nUnder the terms of the agreement, AmacaThera will receive US$5 million upfront and up to US$225 million in future development- and sales-based milestone payments and a tiered royalty on future net sales. The companies will collaborate on clinical development, with AmacaThera leading select clinical studies. Pacira will fund clinical development of AMT-143 through commercial launch. Pacira and AmacaThera expect to initiate a Phase 2 trial in 2026, after which Pacira will assume full responsibility for the development, manufacturing, and commercialization of AMT-143.\n\"This partnership with Pacira is a major validation of our tunable hydrogel platform and our approach to developing long-acting therapies,\" said Mike Cooke, CEO of AmacaThera. \"This partnership allows us to accelerate AMT-143's development while demonstrating the strength, versatility, and commercial appeal of our technology to future partners.\"\nMolly Shoichet, CSO of AmacaThera, added, \"Our platform combines two well-known, biocompatible polymers into an elegant hydrogel that enables precise, localized, and sustained drug delivery. It is compatible with a wide range of therapeutics, from small molecules to biologics, and can be precisely adjusted to meet the unique needs of each clinical application.\"\nKey Highlights of the Deal and Platform\nPlatform validation: Partnering with Pacira underscores the clinical and commercial credibility of AmacaThera's hydrogel technology.\nNon-dilutive funding: AmacaThera accelerates innovation while preserving ownership and long-term value.\nSuperior technology: Hydrogel is simple to manufacture, easy to apply, and offers tunable, long-lasting effects.\nCommercial scalability: Established manufacturing allows for easy scale-up and technology transfer to partners.\nRevenue potential: Structured milestones and royalties align with AmacaThera's strategy of building a diversified, scalable pipeline through partnerships.\n\"We are excited to expand our leadership in innovative, opioid-sparing pain management with the addition of this highly complementary asset to our pipeline,\" commented Jonathan Slonin, MD, MBA, CMO of Pacira BioSciences. \"We look forward to advancing this exciting asset into Phase 2 clinical development in partnership with AmacaThera.\"\nThis agreement reinforces AmacaThera's unique position in the drug delivery space, where its hydrogel platform can be customized to enable rapid and sustained drug release, low-cost manufacturing, broad therapeutic compatibility, and flexibility for multiple partnership opportunities.\nAdvisors: Aquilo Partners LP and Osler, Hoskin & Harcourt LLP acted as financial and legal advisors to AmacaThera on this transaction, respectively.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000002"
//     },
//     "mainHeading": "AmacaThera and Merck Animal Health Announce Collaboration in Animal Health",
//     "subHeading": "AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced it has signed a binding evaluation and option agreement with Merck Animal Health to develop long-acting formulations for use in animal health.",
//     "date": {
//       "$date": "2025-05-01T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "meeting.png",
//     "content": "AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced it has signed a binding evaluation and option agreement with Merck Animal Health to develop long-acting formulations for use in animal health.\nBuilt upon AmacaThera's unique hydrogel platform technology, AmacaGel™, products developed by AmacaThera are designed to enhance the sustained delivery of therapeutic agents with a single injection, potentially revolutionizing animal care and welfare in veterinary medicine.\nMike Cooke, Ph.D., CEO of AmacaThera, expressed his enthusiasm about the partnership: \"We are thrilled to be collaborating with Merck Animal Health, a global leader in animal health. Together, we see immense value in leveraging each other's expertise to explore new frontiers in animal health. This partnership reinforces our commitment to leverage our innovative technology to address important unmet needs in human and now veterinary medicine.\"\nChad Brown, Ph.D., Global Head, Pharmaceutical Sciences and Clinical Supply, and Associate Vice President of Merck Animal Health, added: \"We look forward to collaborating with AmacaThera as we continue to broaden our existing product portfolio of veterinary medicines and technology solutions. It is our hope to leverage our research knowledge and scientific expertise along with the hydrogel platform developed by AmacaThera, which may provide benefits for animal health and welfare.\"\nCooke stated, \"This collaboration builds on our manufacturing know-how and in-human data collected from our hydrogel platform, enabling us to rapidly develop effective solutions for injectable delivery challenges.\" He added, \"What sets our hydrogel apart is its broad compatibility with different drug modalities and that our manufacturing process is defined, fully scalable, and cost-effective.\"\nBoth companies anticipate a fruitful collaboration, with the shared goal of advancing innovative animal health solutions, thereby enabling veterinarians to provide better care.\nAbout AmacaThera\nAmacaThera is a clinical-stage biotechnology company focused on advanced sustained-release hydrogel formulations designed to address critical challenges in therapeutic drug delivery. The Company's flagship platform, AmacaGel™, enables the development of long-acting therapies that enhance patient outcomes while minimizing systemic side effects. AmacaThera is driving innovation in key therapeutic areas, including pain management and oncology.\nThe Company's lead product, AMT-143, is currently advancing into Phase 2 clinical trials. It has demonstrated best-in-class pharmacokinetics, showing strong potential as an alternative to opioid-based solutions in post-operative pain management.\nAmacaThera's proprietary AmacaGel™ platform is a fast-gelling physical hydrogel composed of two well-established polymers. Designed to liquefy under shear force, AmacaGel can be delivered via a conventional syringe and rapidly forms a depot as it warms to body temperature. The platform's lead asset, AMT-143, is a slow-release, non-opioid local anesthetic that leverages the AmacaGel™ technology to provide long-acting post-operative pain relief.\nAbout Merck Animal Health\nAt Merck, known as MSD outside of the United States and Canada, we are unified around our purpose: We use the power of leading-edge science to save and improve lives around the world. For more than a century, we've been at the forefront of research, bringing forward medicines, vaccines and innovative health solutions for the world's most challenging diseases. Merck Animal Health, a division of Merck & Co., Inc., Rahway, N.J., USA, is the global animal health business of Merck. Through its commitment to The Science of Healthier Animals®, Merck Animal Health offers veterinarians, farmers, producers, pet owners and governments one of the widest ranges of veterinary pharmaceuticals, vaccines and health management solutions and services as well as an extensive suite of connected technology that includes identification, traceability and monitoring products. Merck Animal Health is dedicated to preserving and improving the health, well-being and performance of animals and the people who care for them.\nFor more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000003"
//     },
//     "mainHeading": "AmacaThera Collaborates With Leading Global Pharmaceutical Company",
//     "subHeading": "AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company. Through this partnership, a single-injection, long-acting biologic will be developed using AmacaThera's advanced hydrogel delivery platform, AmacaGel™.",
//     "date": {
//       "$date": "2025-04-08T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "team-discussion.png",
//     "content": "TORONTO, April 8, 2025 /PRNewswire/ -- AmacaThera, a clinical-stage biotechnology company specializing in drug delivery, announced a new pipeline program in collaboration with a leading global pharmaceutical company. Through this partnership, a single-injection, long-acting biologic will be developed using AmacaThera's advanced hydrogel delivery platform, AmacaGel™, in combination with the partner's therapeutic. Co-funded by both organizations, the initiative will leverage their complementary strengths and resources to accelerate the development of this innovative biologic.\nFor more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000004"
//     },
//     "mainHeading": "RBCx features AmacaThera's journey",
//     "subHeading": "RBCx, the tech banking and investment arm of the Royal Bank of Canada, has featured AmacaThera's drug development platform and start-up journey.",
//     "date": {
//       "$date": "2024-06-13T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "scientist-portrait.png",
//     "content": "RBCx, the tech banking and investment arm of the Royal Bank of Canada, has featured AmacaThera's drug development platform and start-up journey.\nRead the full AmacaThera profile on RBCx.com.\nThe article includes interviews with Co-Founders, CEO Mike J. Cooke and Chief Science Officer Molly Shoichet, and covers both the original research behind the company, led by Shoichet's lab at the University of Toronto, and the team's progress in bringing AMT-143 to market.\nIn May 2024, AmacaThera announced that the first human subject had been dosed with AMT-143, the company's lead asset in non-opioid acute pain management. This news followed the closing of AmacaThera's successful Series A extension round of $4 million CAD in November 2023.\nHere's an excerpt:\n\"It's been so exciting to see our research invention of AmacaGel be the basis of AmacaThera and now to see it applied in people,\" Shoichet says. \"Our goal is to make products that will make a difference in people's lives. With our first product, we aim to both alleviate pain and put a dent in the opioid crisis, thereby filling unmet medical and societal needs.\"\nMoreover, Cooke explains, its efficacy in controlling pain not only fosters optimal healing, but the downstream effect may be a boon to our struggling health system. \"If you have that rapid pain control, you'll get better recovery. You can get people out of the hospital quicker and by reducing their length of stay, you can increase hospital capacity, and serve more patients. These are huge drivers and we're building the company with that mentality of efficacy and efficiency.\"\nRBCx supports AmacaThera's day-to-day banking needs, and has since the company was founded.\nAbout AmacaThera:\nAmacaThera is a clinical-stage biotechnology company developing a novel drug delivery platform to improve patient outcomes across multiple therapeutic areas, including post-surgical pain management, cancer and other hard-to-reach target areas.\nLearn more about our technology.\nFor more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000005"
//     },
//     "mainHeading": "AmacaThera Closes Series A Extension to Advance Clinical Development of Long Acting, Localized, Non-Opioid Therapeutics to Improve Post-Surgery Patient Care",
//     "subHeading": "AmacaThera, a leader in the development of novel injectable, localized therapeutics based upon its AmacaGel delivery platform, announced the closing of a CAD$4.0 million financing round with a new lead investor, supported by existing investors, BDC Capital's Women in Technology Venture Fund, Inveready, Lumira Ventures, StandUp Ventures, and MaRS IAF.",
//     "date": {
//       "$date": "2023-11-28T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "microscope.png",
//     "content": "Toronto, ON — AmacaThera, a leader in the development of novel injectable, localized therapeutics based upon its AmacaGel delivery platform, announced the closing of a CAD$4.0 million financing round with a new lead investor, supported by existing investors, BDC Capital's Women in Technology Venture Fund, Inveready, Lumira Ventures, StandUp Ventures, and MaRS IAF. The proceeds will be used to accelerate the clinical development of the lead clinical candidate, AMT-143, and also to advance multiple pipeline programs targeting the local, sustained release market.\nDespite the continuing opioid epidemic, which results in ~80,000 deaths annually in the US alone, the treatment of pain continues to be frequently managed through opioid-based medications. This includes in post-surgical settings, where it can be a gateway to addiction and the abuse of prescription pain medicines and illicit narcotics. Leveraging the AmacaGel platform, AmacaThera is developing AMT-143 with the objective of blending safe, non-opioid, therapeutic ability to provide an extended period of post-surgical pain relief and reduce with the aim of stimulating the need for opioids in the postsurgical recovery period. Preclinical studies have shown superior release kinetics to the current standard of care, resulting in rapid onset pain relief followed by long-acting pain control for up to 3 days. Hence providing relief over the most severe pain window following surgery. The Phase Ib clinical trial is scheduled to commence in early 2024.\nThe Company's unique, injectable, hydrogel AmacaGel platform is effective for the delivery of a wide range of therapeutics, from small molecules to antibodies to lipid nanoparticles to stem cells, as demonstrated in over 40 peer-reviewed publications. With the demonstrated safety in humans, the funding will also be used to expand the application of the platform and to develop additional products for the pipeline.\nLead investor Paul Austin said, 'AmacaThera is developing a product that fulfills both societal and medical needs for a large market.'\nLumira Ventures, Lu Han, agreed, 'AmacaThera continues to build an innovative portfolio of therapeutics that have the potential to establish a new standard of care across a variety of indications.'\n'We are excited to welcome our new lead investor to our board, as they share our enthusiasm for AmacaThera's vision and potential for long-term success', said Dr. Michael Cooke, CEO and Co-Founder. 'This investment will enable us to expand and accelerate our efforts in developing new long-acting injectable products'.\n'This financing provides further evidence of the importance of therapeutic delivery in the life science innovation cycle', said Dr. Molly Shoichet, CSO, Co-Founder, and University Professor at the University of Toronto. 'The commitment of our existing investors reflects their recognition of the platform opportunity and the potential product portfolio.'\nAbout AmacaThera\nAmacaThera Inc., a resident company of Johnson & Johnson Innovation, JLABS @ Toronto is a clinical-stage company transforming therapeutics to make a difference in patient health. AmacaGel, our unique, injectable hydrogel platform, provides localized sustained drug delivery for improved patient outcomes across multiple therapeutic areas, including post-surgical pain management, cancer and other hard-to-reach target areas. For more information, visit www.amacathera.com.\nFor more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000006"
//     },
//     "mainHeading": "New study setting the stage for non-opioid analgesic in post-surgical pain management",
//     "subHeading": "AmacaThera is pleased to announce a new collaborator with the University Health Network (UHN) to evaluate the health economic impact of opioid use in post-surgical pain management, expecting to show through its Early Adopter Health Network (EAHN), the economic and clinical value of opioid use on health systems using indicators such as length of hospital stay and overall healthcare costs.",
//     "date": {
//       "$date": "2023-07-05T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "meeting.png",
//     "content": "Toronto, ON — Patients are often prescribed opioids after undergoing surgical care to help them manage their post-surgical pain. This interaction often leads to dependency and reduces the efficiency of the healthcare system.\nAmacaThera Inc. and the University Health Network company, biopharmaceutical company, is developing AMT-143, a long-acting formulation of a non-opioid anesthetic designed to be placed directly at the surgical site. Upon injection, the compound would sustain drug release for two to three days, which may be period through the most severe pain window following a surgery. If successful, this approach to pain management would alleviate the need for opioids in the patient's pain management protocols. Current non-opioid opening products for post-surgical pain management must demonstrate a positive impact on current patient care and the healthcare system.\nAmacaThera is pleased to announce a new collaborator with the University Health Network (UHN) to evaluate the health economic impact of opioid use in post-surgical pain management, expecting to show through its Early Adopter Health Network (EAHN), the economic and clinical value of opioid use on health systems using indicators such as length of hospital stay and overall healthcare costs.\n\"Many patients will see an already experiencing chronic pain prior to surgery and may already have an opioid prescription, after surgery, that dosage sticks to be even higher. We want to create a good approach to their pain management,\" said Dr. Naveed Siddiqui, a Pain Research Unit at Toronto General Hospital, University Health Network. Dr. Clarke is also the President-Elect of the Canadian Pain Society and Co-Chair Knowledge Translation, University of Toronto Centre for the Study of Pain. 'Chronic post-surgical pain and persistent post-surgical opioid use is a significant burden to today's health care system, and patients need innovative options to improve their pain management without necessarily escalating their opioid medications,' he added.\n\"UHN is the largest health research hospital in Canada with a world-class department of anesthesia and pain management,\" said Mike Cooke, CEO of AmacaThera. \"They are exactly the right partner to help us understand the value and impact of reducing opioid use in the surgical setting. They are capturing real-world patient use data to illustrate the current patient experience in an opioid context and show how our product may provide improvement.\"\nThis partnership presents a unique opportunity to identify important areas where non-opioid pain management products like AMT-143 may improve pain management practices, with the overall aim of providing alternatives to opioids for post-surgical patients.\n\"The three days following a surgery are the most difficult for patients. To date, opioids have presented the strongest source of relief, despite their known downstream risks for the patient once the healthcare system is concerned,\" Cooke continued. \"We believe AMT-143 has been designed as a non-opioid alternative. Results from this retrospective study will help us to establish a baseline from which we can evaluate AMT-143 in a Phase 1 clinical trial.\"\n\"OBOR supports companies driving innovation in key areas, including therapeutics, that can transform healthcare,\" said Todd Mainprize, OBOR President and CEO. \"This program, a Therapeutics cost-benefit evaluation project that will help AmacaThera set data-driven benchmarks for future clinical evaluations of new spend-sparing products and services. We are delighted that AmacaThera is forging a path towards commercialization of Therapeutics through the EAHN program.\"\nAbout OBOR\nOBOR is a not-for-profit, membership-based organization dedicated to advancing health technology innovation and commercialization. In prioritizing the evaluation of new technologies, OBOR supports companies in advancing proof of concept, providing advisory expertise in patent development and advocacy to further the commercialization of human health technologies, positioning Canada as a leader in the international marketplace. For more information, visit OBOR.ca.\nAbout AmacaThera\nAmacaThera Inc., is a clinical-stage biotechnology company transforming therapeutics to make a difference in patient health. AmacaGel™, our unique, injectable hydrogel platform provides localized sustained drug delivery for improved patient outcomes across multiple therapeutic areas, including post-surgical pain management, cancer and other hard-to-reach target medical needs. For more information, visit www.amacathera.com.\nAbout UHN\nUniversity Health Network consists of Toronto General and Toronto Western Hospitals, the Princess Margaret Cancer Centre, Toronto Rehabilitation Institute, and The Michener Institute of Education at UHN. The scope of research and complexity of cases at University Health Network has made it a national and international leader. UHN is one of Canada's largest academic health science centers and has a leading research program in Canada, with major research in cardiology, transplantation, neurosciences, oncology, surgical innovation, arthritis, vision, infectious diseases, genetic medicine and rehabilitation. University Health Network is a research hospital affiliated with the University of Toronto. For more information, visit www.uhn.ca.\nFor more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000007"
//     },
//     "mainHeading": "AmacaThera Doses First Subjects in Phase 1 Clinical Trial for AmacaGel™ Therapeutic Platform",
//     "subHeading": "AmacaThera Inc today announced that the first subjects have been dosed in the company's Phase 1 first-in-human clinical investigation of the safety of AmacaGel™.",
//     "date": {
//       "$date": "2023-03-09T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "surgery.png",
//     "content": "TORONTO, March 9, 2023 /CNW/ — AmacaThera Inc, a clinical-stage company transforming therapeutics to make a difference in patient health, today announced that the first subjects have been dosed in the company's Phase 1 first-in-human clinical investigation of the safety of AmacaGel™.\nAmacaGel™ is a unique injectable hydrogel platform technology. It can be injected directly into a targeted organ or incision site, where it forms a depot from which medications can achieve local benefit, thereby improving patient lives. Patients were dosed with the hydrogel alone group to demonstrate the core technology's safety.\n\n The initiation of this first-in-human safety study marks an important milestone in AmacaThera's development into a clinical stage company\" said Dr. Mike Cooke, AmacaThera's CEO and Co-Founder.\"We're confident in this study will validate the safety and tolerability of the AmacaGel™ platform, thereby serving as the foundation for a myriad of novel therapeutic entities that can improve patient outcomes.\"\nDr. Molly Shoichet, Chief Scientific Officer, Co-Founder of AmacaThera and University of Toronto Professor said, \"We are proud to be confirming the clinical success of AmacaGel™ which serves as the launch pad for improving the efficacy of antibodies, mRNA, small molecules, proteins amongst other therapeutic modalities. It's exciting to see AmacaThera advance this technology into the clinic in such a short time.\"\nAmacaThera's pipeline development will progress throughout 2023 with AMT-143 Phase 1 efficacy studies in post-operative pain alongside the rapid pre-clinical advancement of AMT-456 for multi-modal treatment of unmet medical needs in oncology.\nAbout AmacaGel™\n AmacaGel™, AmacaThera's platform technology, is a fast-gelling, thermoresponsive hydrogel that has been designed to both liquify under shear force, enabling conventional syringe delivery, and then gel at body temperature, thereby forming a depot at the injection site.\nAbout AmacaThera\n\n AmacaThera Inc, a clinical-stage company transforming therapeutics to make a difference in patient health. AmacaGel™, our unique, injectable hydrogel platform provides localized sustained drug delivery for improved patient outcomes across multiple therapeutic areas, including post-surgical pain management, cancer and other hard-to-reach unmet medical needs.\n For further information:\n Mike Foorer VP Business Development & General Manager mike_foorer at amacathera dot ca \n For more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   },
//   {
//     "_id": {
//       "$oid": "676b1a1000000000000000008"
//     },
//     "mainHeading": "AmacaThera's Lung Cancer Applications Recognized in QuickFire Challenge",
//     "subHeading": "AmacaThera has received grant funding from the Innovations for Vets QuickFire Challenge: Lung Cancer & Physical Trauma.",
//     "date": {
//       "$date": "2023-01-04T00:00:00.000Z"
//     },
//     "pressReleaseLink": "",
//     "imageUrl": "cancer-research.png",
//     "content": "AmacaThera, a clinical-stage biotechnology company developing advanced injectable biomaterials for local, sustained delivery of oncology and pain therapeutics, has received grant funding from the Innovations for Vets QuickFire Challenge: Lung Cancer & Physical Trauma.\nThe program, launched by Johnson & Johnson Innovation- JLABS (JLABS) with the Johnson & Johnson Office of Military and Veterans Affairs, was created with the goal of advancing technologies that benefit veterans.\nAccording to research published in Healthcare, veterans are disproportionately impacted by certain diseases, with a higher incidence of risk factors for chronic health conditions relative to non-Veterans. The program sought potentially ground-breaking technologies to directly address the unique needs of the military community, particularly in lung cancer and physical trauma. Military service members, for example, are also 25 percent more likely to receive a lung cancer diagnosis.\nWith the QuickFire Challenge funding, AmacaThera will partner with another biotech company to collaborate on visualizing and sampling lung tumors. Through the partnership, the companies will explore AmacaThera's hydrogel technology for the delivery of therapeutics to these hard-to-reach locations.\nAmacaThera's hydrogel technology was specifically designed with the aim to transform therapeutics for treatment of tumours, such as lung cancer, which cannot be removed due to their location, size, or potential to spread. This approach has the potential to treat unresectable lung cancers and other solid tumours that require a local approach to drug delivery.\n\"We founded AmacaThera to revolutionize the range of treatment options available to patients using a range of therapeutic agents, such as small molecules, antibodies, proteins or peptides,\" says Dr. Michael J. Cooke, CEO and co-founder of AmacaThera.\"We're honoured to be among the companies selected to participate in this program, and excited to form new collaborations.\"\nMolly Shoichet, Co-Founder and CSO, added, \"Our unique, responsive hydrogel strategy enables us to achieve success in this innovative approach to lung cancer treatment.\"\nAbout AmacaThera\nAmacaThera is a clinical-stage biotechnology company transforming therapeutics to make a difference in patient health. Our unique, injectable hydrogel platform provides localized, sustained drug delivery to improve patient outcomes across multiple therapeutic areas, including post-surgical pain management, cancer and other hard-to-reach target areas. To learn more, visit amacathera.com.\nFor more information, visit www.amacathera.com.",
//     "viewCount": 0,
//     "isPublished": true,
//     "createdAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     },
//     "updatedAt": {
//       "$date": "2025-12-29T00:00:00.000Z"
//     }
//   }
// ]