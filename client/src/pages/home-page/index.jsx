import React from 'react';
import Hero from './home-page-hero';
import CardComponents from './home-page-card-components';
import Cards from './home-page-cards';

const CardItems = [
  {
    title: 'Paprasta susisiekti',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.anandgroupindia.com%2Fwp-content%2Fuploads%2F2019%2F05%2Fcontactus.jpg&f=1&nofb=1',
    action: 'sužinokite daugiau',
  },
  {
    title: 'Atvažiuojame į vietą',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.revv.co.in%2Fblogs%2Fwp-content%2Fuploads%2F2020%2F09%2FCar-Rentals-in-India.jpg&f=1&nofb=1',
    action: 'sužinokite daugiau',
  },
  {
    title: 'Atsiskaitymai grynais',
    imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F10992313%2Fr%2Fil%2F44d384%2F1792365654%2Fil_794xN.1792365654_rzp9.jpg&f=1&nofb=1',
    action: 'sužinokite daugiau',
  },
];

const HomePage = () => (
  <>
    <Hero />
    <CardComponents>
      {
        CardItems.map(({ title, imgSrc, action }) => (
          <Cards key={title} title={title} imgSrc={imgSrc} action={action} />
        ))
      }
    </CardComponents>
  </>
);

export default HomePage;
