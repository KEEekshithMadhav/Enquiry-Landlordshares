export type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  priceLabel: string;
  description: string;
  image: string;
  tag?: string;
  websiteUrl: string;
};

// Initial catalogue based on the publicly visible LandlordShares listings.
// Confirm availability, price and specifications with the team before production.
const site = 'https://landlordshares.com';
export const properties: Property[] = [
  {
    id: 'iwa-by-srias', name: 'iWA by SRIAS', location: 'Nanakramguda',
    type: '3, 3.5, 4 & 4.5 BHK', priceLabel: '₹9,500/sq.ft. (listed)',
    description: '2,290–4,710 sq.ft. · Tower 6 availability shown on the main website.',
    image: `${site}/properties/iwa-by-srias.webp`, tag: 'Featured', websiteUrl: `${site}/` 
  },
  {
    id: 'mango-leaf-villas', name: 'Mango Leaf Villas', location: 'Osman Nagar',
    type: '3 & 4 BHK Villas', priceLabel: 'Price on enquiry',
    description: '2,739–3,084 sq.ft. · Under construction, according to the current listing.',
    image: `${site}/properties/mango-leaf-villas.jpg`, websiteUrl: `${site}/`
  },
  {
    id: 'linq-by-raghava', name: 'Linq by Raghava', location: 'Kokapet',
    type: '3 BHK Premium', priceLabel: '₹7,100–₹7,500/sq.ft. + FR (listed)',
    description: '1,798–2,388 sq.ft. · 9.2-acre gated community, as listed.',
    image: `${site}/properties/linq-raghava.png`, websiteUrl: `${site}/`
  },
  {
    id: 'prestige-golden-groove', name: 'Prestige Golden Groove', location: 'Tellapur',
    type: '2, 3 & 4 BHK', priceLabel: '₹6,899/sq.ft. + applicable charges (listed)',
    description: '1,169–3,013 sq.ft. · Premium township listing.',
    image: `${site}/properties/prestige-golden-groove.webp`, websiteUrl: `${site}/`
  },
  {
    id: 'rajpushpa-prestinia', name: 'Rajpushpa Prestinia', location: 'Kokapet',
    type: '2 & 3 BHK', priceLabel: 'From ₹1.1 Cr (listed; confirm current price)',
    description: '1,380–2,300 sq.ft. · Contact the team for current availability and pricing.',
    image: `${site}/properties/rajpushpa-prestinia.webp`, websiteUrl: `${site}/`
  },
  {
    id: 'ssi-fortune-grande', name: 'SSI Fortune Grande', location: 'Neopolis',
    type: '3.5 & 4 BHK', priceLabel: '₹8,699/sq.ft. + PLC (listed)',
    description: '2,850–3,910 sq.ft. · Ultra-spacious residences.',
    image: `${site}/properties/ssi-fortune.png`, websiteUrl: `${site}/`
  },
  {
    id: 'trilight', name: 'Trilight', location: 'Kokapet',
    type: '3 & 4 BHK', priceLabel: '₹11,600/sq.ft. + applicable charges (listed)',
    description: '2,888–5,777 sq.ft. · Sky villa residences.',
    image: `${site}/properties/trilight.png`, websiteUrl: `${site}/`
  },
  {
    id: 'anvita-high9', name: 'Anvita High9', location: 'Tellapur',
    type: '2 & 3 BHK', priceLabel: '₹6,499/sq.ft. + FR + infrastructure (listed)',
    description: '1,360–2,610 sq.ft. · Smart homes listing.',
    image: `${site}/properties/anvita-high9.webp`, websiteUrl: `${site}/`
  },
];

export function getProperty(id: string | null | undefined) {
  return properties.find((property) => property.id === id);
}
