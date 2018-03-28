/**
 * Configuration
 * @module config
 */

import NPMPackage from '../../package.json';

const config = {
  name: NPMPackage.name,
  title: NPMPackage.title,
  description: NPMPackage.description,
  app_title: "Qatar's funding of the Muslim Brotherhood (MB) and its satellite organizations across Europe",
  map_options: {
    scale: {
      domain: [0, 37843000],
      range: [1, 25],
    },
    projectionConfig: {
      scale: 2000,
    },
    zoomableGroup: {
      center: [9, 49],
    },
  },
  popScales: {
    domain: [0, 1000000, 30000000],
    range: ['#CFD8DC', '#3f51b5', '#0f2688'],
  },
};

export default config;
